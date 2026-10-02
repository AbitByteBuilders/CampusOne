from flask import Flask
from flask_cors import CORS
from models import db, seed_mock_data
from routes import api_routes

app = Flask(__name__)
CORS(app) 

# ==============================================================================
# DATABASE CONFIGURATION
# ==============================================================================

# PRODUCTION (MySQL) - Uncomment this line when switching to real database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/campus_life'

# PROTOTYPE (SQLite) - Active for Hackathon Development
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prototype.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(api_routes, url_prefix='/api')

with app.app_context():
    db.create_all()
    # Injects prototype data to populate the SLA Heatmap immediately
    seed_mock_data()

if __name__ == '__main__':
    # Run the server
    app.run(debug=True, port=5000)