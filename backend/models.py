from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Complaint(db.Model):
    __tablename__ = 'complaints'   
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), default="Uncategorized") # Auto-routed by AI
    room_number = db.Column(db.String(20), nullable=True)
    status = db.Column(db.String(20), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    #INNOVATION 3: SLA Ageing Heatmap Logic
    def to_dict(self):
        age_in_hours= (datetime.utcnow() - self.created_at).total_seconds()/3600
        
        sla_color = "Green" #new
        if age_in_hours > 48:
            sla_color = "Red" # Critical Condition 
        elif age_in_hours >24:
            sla_color = 'Yellow' # warning
            
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "room_number": self.room_number,
            "status": self.status,
            "sla_color": sla_color,
            "age_hours": round(age_in_hours, 1),
            "date": self.created_at.strftime("%d %b %Y")
        }
        

class StudentRequest(db.Model):
    __tablename__ = 'student_requests'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default="Pending")
    date_str = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {"id": self.id, "title": self.title, "date": self.date_str, "status": self.status}


class AttendanceRecord(db.Model):
    __tablename__ = 'attendance'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(100), nullable=False)
    total_classes = db.Column(db.Integer, nullable=False, default=0)
    attended_classes = db.Column(db.Integer, nullable=False, default=0)

    def to_dict(self):
        # Dynamically calculate the percentage
        percentage = (self.attended_classes / self.total_classes * 100) if self.total_classes > 0 else 0
        # Automatically flag if attendance drops below the standard 75% requirement
        status = "Good" if percentage >= 75 else "Shortage"
        
        return {
            "id": self.id,
            "subject": self.subject,
            "total_classes": self.total_classes,
            "attended_classes": self.attended_classes,
            "percentage": round(percentage, 1),
            "status": status
        }    
# ==============================================================================
# MOCK DATA SEEDER
# ==============================================================================
def seed_mock_data():
    """Injects prototype data if the database is empty."""
    if Complaint.query.first() is None:
        # Create complaints with manipulated past timestamps to demonstrate the SLA Heatmap
        import datetime as dt
        
        c1 = Complaint(title="Hostel water leakage", category="Plumbing", room_number="B-204")
        c1.created_at = dt.datetime.utcnow() - dt.timedelta(hours=50) # Forces RED SLA
        
        c2 = Complaint(title="Block B electricity", category="Electrical", room_number="B-Block")
        c2.created_at = dt.datetime.utcnow() - dt.timedelta(hours=26) # Forces YELLOW SLA
        
        c3 = Complaint(title="Wi-Fi Router dead", category="IT Support", room_number="A-101")
        c3.created_at = dt.datetime.utcnow() - dt.timedelta(hours=2)  # Forces GREEN SLA
        
        db.session.add_all([c1, c2, c3])
        
        req1 = StudentRequest(title="Bonafide Certificate", date_str="24 Sep 2026", status="Pending")
        req2 = StudentRequest(title="Leave Request", date_str="20 Sep 2026", status="Approved")
        db.session.add_all([req1, req2])
        
        db.session.commit()
    # Inside seed_mock_data()...
    if AttendanceRecord.query.first() is None:
        db.session.add_all([
            AttendanceRecord(subject="Computer Networks", total_classes=40, attended_classes=35), # 87.5%
            AttendanceRecord(subject="Operating Systems", total_classes=38, attended_classes=32), # 84.2%
            AttendanceRecord(subject="Web Development", total_classes=42, attended_classes=28),   # 66.6% (Triggers Shortage)
            AttendanceRecord(subject="Database Systems", total_classes=35, attended_classes=30)   # 85.7%
        ])
        db.session.commit()