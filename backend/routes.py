from flask import Blueprint, jsonify, request
from datetime import date
import pyotp
from models import db, Complaint, StudentRequest, AttendanceRecord, ClassSchedule, Notice, ClassSession, DailyAttendanceLog
from twilio.twiml.messaging_response import MessagingResponse

api_routes = Blueprint('api_routes', __name__)

# ==============================================================================
# INNOVATION 2: AI-Powered Deduplication & Auto-Routing
# ==============================================================================

def auto_route_complaint(text):
    text = text.lower()
    if any(word in text for word in ["water", "tap", "leak", "plumbing"]):
        return "Plumbing"
    if any(word in text for word in ["wifi", "internet", "router", "network"]):
        return "IT Support"
    if any(word in text for word in ["light", "fan", "electricity", "power"]):
        return "Electrical"
    return "General Maintenance"

def check_for_spike(category):
    # If 3 or more unresolved complaints exist in this category, trigger a spike alert
    open_tickets = Complaint.query.filter_by(category=category, status="Pending").count()
    if open_tickets >= 3:
        return f"SPIKE ALERT: High volume of {category} issues."
    return None

@api_routes.route('/complaints', methods=['POST'])
def create_complaint():
    data = request.get_json()
    description = data.get('description', '')
    
    # Auto-Route
    category = auto_route_complaint(description)
    
    # Check Deduplication / Spike
    spike_warning = check_for_spike(category)
    
    new_ticket = Complaint(
        title=data['title'],
        description=description,
        room_number=data.get('room_number', 'N/A'),
        category=category
    )
    
    db.session.add(new_ticket)
    db.session.commit()
    
    return jsonify({
        "message": "Complaint registered successfully",
        "ticket": new_ticket.to_dict(),
        "alert": spike_warning
    }), 201

@api_routes.route('/complaints', methods=['GET'])
def get_complaints():
    complaints = Complaint.query.all()
    return jsonify([c.to_dict() for c in complaints]), 200

@api_routes.route('/timetable', methods=['GET'])
def get_timetable():
    # If the frontend asks for a specific day (e.g., /api/timetable?day=Monday)
    day_filter = request.args.get('day')
    
    if day_filter:
        classes = ClassSchedule.query.filter_by(day=day_filter).all()
    else:
        # Otherwise return the entire week
        classes = ClassSchedule.query.all()
        
    return jsonify([c.to_dict() for c in classes]), 200

# ==============================================================================
# INNOVATION 1: Zero-Bandwidth SMS Webhook
# ==============================================================================
@api_routes.route('/webhook/sms', methods=['POST'])
def sms_webhook():
    """
    Twilio posts here when a student sends an SMS.
    Format expected: "COMPLAINT B204 Water is leaking"
    """
    incoming_msg = request.values.get('Body', '').strip()
    
    if incoming_msg.upper().startswith("COMPLAINT"):
        # Strip the trigger word
        issue_text = incoming_msg[9:].strip() 
        category = auto_route_complaint(issue_text)
        
        new_ticket = Complaint(
            title=issue_text[:50] + "...", # Generate title from SMS
            description=issue_text,
            category=category,
            room_number="From SMS"
        )
        db.session.add(new_ticket)
        db.session.commit()
        
        # Send automated SMS back to the keypad phone
        resp = MessagingResponse()
        resp.message(f"CampusOne: Ticket #{new_ticket.id} registered under {category}. We are on it.")
        return str(resp)

    # Fallback for unrecognized commands
    resp = MessagingResponse()
    resp.message("CampusOne: Send 'COMPLAINT [Room] [Issue]' to log a ticket.")
    return str(resp)

@api_routes.route('/attendance', methods=['GET'])
def get_attendance():
    records = AttendanceRecord.query.all()
    return jsonify([record.to_dict() for record in records]), 200

# --- GET: Fetch Notices ---
@api_routes.route('/notices', methods=['GET'])
def get_notices():
    # Frontend can request specific notices (e.g., /api/notices?role=student)
    role_filter = request.args.get('role', 'all')
    
    if role_filter == 'all':
        notices = Notice.query.order_by(Notice.date_posted.desc()).all()
    else:
        # Returns notices specifically for this role PLUS campus-wide "all" notices
        notices = Notice.query.filter(Notice.target_role.in_([role_filter, 'all'])).order_by(Notice.date_posted.desc()).all()
        
    return jsonify([n.to_dict() for n in notices]), 200

# --- POST: Create a New Notice ---
@api_routes.route('/notices', methods=['POST'])
def create_notice():
    data = request.get_json()
    new_notice = Notice(
        title=data['title'],
        content=data.get('content', ''),
        target_role=data.get('target_role', 'all')
    )
    
    db.session.add(new_notice)
    db.session.commit()
    
    return jsonify({"message": "Announcement posted!", "notice": new_notice.to_dict()}), 201

# --- 1. START SESSION: Faculty requests the TOTP Secret ---
@api_routes.route('/faculty/attendance/start', methods=['POST'])
def start_dynamic_session():
    data = request.get_json()
    faculty_name = data.get('faculty_name')
    subject = data.get('subject')
    today = date.today()
    
    # Check if a session already exists today to prevent duplicates
    session = ClassSession.query.filter_by(faculty_name=faculty_name, subject=subject, session_date=today).first()
    
    if not session:
        session = ClassSession(faculty_name=faculty_name, subject=subject, session_date=today)
        db.session.add(session)
        
        # Pre-populate all enrolled students as "Absent" for today's log
        # (Assuming you have a method or table to get enrolled students)
        # enrolled_students = get_enrolled_students(subject)
        # for student in enrolled_students:
        #     db.session.add(DailyAttendanceLog(roll_number=student.roll, student_name=student.name, subject=subject, faculty_name=faculty_name, date_recorded=today))
        
        db.session.commit()

    # We send the secret to the frontend. The React frontend will use an OTP library
    # to generate a new QR code every 5 seconds using this exact secret.
    return jsonify({
        "message": "Session started",
        "totp_secret": session.totp_secret,
        "interval": 5
    }), 200

# --- 2. VERIFY SCAN: Student submits the 5-second token ---
@api_routes.route('/student/attendance/verify', methods=['POST'])
def verify_dynamic_qr():
    data = request.get_json()
    roll_number = data.get('roll_number')
    subject = data.get('subject')
    submitted_token = data.get('token') # The 6-digit code extracted from the QR scan
    
    session = ClassSession.query.filter_by(subject=subject, session_date=date.today(), is_active=True).first()
    if not session:
        return jsonify({"error": "No active session for this subject today"}), 404

    # Initialize the TOTP validator with a strict 5-second interval
    totp = pyotp.TOTP(session.totp_secret, interval=5)
    
    # Verify the token. 'valid_window=1' allows a 5-second grace period for network latency
    if totp.verify(submitted_token, valid_window=1):
        # Locate today's log and update status
        log = DailyAttendanceLog.query.filter_by(roll_number=roll_number, subject=subject, date_recorded=date.today()).first()
        if log:
            log.status = "Present"
            db.session.commit()
            return jsonify({"message": "Attendance marked securely"}), 200
        return jsonify({"error": "Student not found in today's roster"}), 404
        
    return jsonify({"error": "Invalid or expired QR Code. Please scan the current code on screen."}), 403

# --- 3. HISTORICAL & DAILY RECORDS (Access Controlled) ---
@api_routes.route('/faculty/attendance/history', methods=['GET'])
def get_attendance_history():
    faculty_name = request.args.get('faculty_name')
    subject = request.args.get('subject')
    query_date = request.args.get('date', date.today().strftime("%Y-%m-%d")) # Defaults to today
    
    # Enforce Access Control: Faculty can only query their own subjects
    logs = DailyAttendanceLog.query.filter_by(faculty_name=faculty_name, subject=subject, date_recorded=query_date).all()
    
    return jsonify([log.to_dict() for log in logs]), 200

# --- 4. MANUAL OVERRIDE (Date-Locked Immutability) ---
@api_routes.route('/faculty/attendance/override', methods=['PUT'])
def manual_attendance_override():
    data = request.get_json()
    roll_number = data.get('roll_number')
    subject = data.get('subject')
    faculty_name = data.get('faculty_name')
    target_date_str = data.get('date') # Format: YYYY-MM-DD
    new_status = data.get('status')
    
    target_date = date.fromisoformat(target_date_str)
    
    # IMMUTABILITY CHECK: Reject any modifications if the date has passed
    if target_date < date.today():
        return jsonify({"error": "Security Lock: Historical attendance records cannot be altered."}), 403
        
    log = DailyAttendanceLog.query.filter_by(roll_number=roll_number, subject=subject, faculty_name=faculty_name, date_recorded=target_date).first()
    if log:
        log.status = new_status
        db.session.commit()
        return jsonify({"message": "Attendance updated"}), 200
        
    return jsonify({"error": "Record not found"}), 404

@api_routes.route('/faculty/attendance/daily-summary', methods=['GET'])
def get_daily_summary():
    faculty_name = request.args.get('faculty_name')
    subject = request.args.get('subject')
    query_date = request.args.get('date') # e.g., '2026-10-03' for yesterday

    # Fetch all logs for this specific date and subject
    logs = DailyAttendanceLog.query.filter_by(
        faculty_name=faculty_name, 
        subject=subject, 
        date_recorded=query_date
    ).all()

    if not logs:
        return jsonify({"message": "No class held on this date, or records not found."}), 404

    # Calculate class statistics for the day
    total_students = len(logs)
    present_count = sum(1 for log in logs if log.status == "Present")
    class_percentage = round((present_count / total_students) * 100, 1) if total_students > 0 else 0

    return jsonify({
        "date": query_date,
        "subject": subject,
        "class_overall_percentage": class_percentage,
        "total_students": total_students,
        "students_present": present_count,
        "roster": [log.to_dict() for log in logs] # Includes who was present/absent
    }), 200
    
@api_routes.route('/faculty/attendance/overall-summary', methods=['GET'])
def get_overall_summary():
    faculty_name = request.args.get('faculty_name')
    subject = request.args.get('subject')

    # Fetch every single log for this subject since the semester started
    all_logs = DailyAttendanceLog.query.filter_by(
        faculty_name=faculty_name, 
        subject=subject
    ).all()

    if not all_logs:
        return jsonify([]), 200

    # Group the logs by student and calculate their individual totals
    student_stats = {}
    for log in all_logs:
        if log.roll_number not in student_stats:
            student_stats[log.roll_number] = {
                "student_name": log.student_name,
                "roll_number": log.roll_number,
                "total_classes": 0,
                "attended_classes": 0
            }
        
        student_stats[log.roll_number]["total_classes"] += 1
        if log.status == "Present":
            student_stats[log.roll_number]["attended_classes"] += 1

    # Calculate the final semester percentage for each student
    roster_summary = []
    for roll, stats in student_stats.items():
        percentage = (stats["attended_classes"] / stats["total_classes"]) * 100 if stats["total_classes"] > 0 else 0
        stats["percentage"] = round(percentage, 1)
        stats["status"] = "Good" if percentage >= 75 else "Shortage"
        roster_summary.append(stats)

    return jsonify(roster_summary), 200