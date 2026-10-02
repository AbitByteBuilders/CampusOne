from flask import Blueprint, jsonify, request
from models import db, Complaint, StudentRequest
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