"""
Smart Parking Availability Prediction API
Uses trained ML model as behavior templates for virtual parking slots across India
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import joblib
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# =====================================
# Initialize FastAPI App
# =====================================
app = FastAPI(
    title="Smart Parking Availability API",
    description="Predicts parking availability across Indian cities using ML behavior templates",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# Load Model
# =====================================
try:
    model = joblib.load("availability_model.pkl")
    print("ML Model loaded")
except:
    model = None
    print("Model not loaded")

try:
    avg_duration = joblib.load("duration.pkl")
    print("Duration data loaded")
except:
    avg_duration = {}
    print("Duration data not loaded")
# =====================================
# Locations
# =====================================
PARKING_LOCATIONS = {
    # Delhi
    "Select Citywalk Mall, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Mall",
        "total_slots": 250,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "IGI Airport T3, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Airport",
        "total_slots": 800,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "India Gate, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Tourist",
        "total_slots": 150,
        "template_slots": ["IR20", "IR40"]
    },

    # Mumbai
    "Phoenix Palladium Mall": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 320,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Chhatrapati Shivaji Airport": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Airport",
        "total_slots": 950,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Gateway of India": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Tourist",
        "total_slots": 180,
        "template_slots": ["IR20", "IR40"]
    },

    # Bengaluru
    "Orion Mall": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Mall",
        "total_slots": 400,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Kempegowda Airport": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Airport",
        "total_slots": 1200,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Lalbagh Botanical Garden": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Tourist",
        "total_slots": 220,
        "template_slots": ["IR20", "IR40"]
    },

    # Hyderabad
    "Inorbit Mall Hyderabad": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Mall",
        "total_slots": 380,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Rajiv Gandhi International Airport": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Airport",
        "total_slots": 1100,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Charminar": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Tourist",
        "total_slots": 200,
        "template_slots": ["IR20", "IR40"]
    },

    # Chennai
    "Express Avenue Mall": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Mall",
        "total_slots": 350,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Chennai International Airport": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Airport",
        "total_slots": 1000,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Marina Beach": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Tourist",
        "total_slots": 250,
        "template_slots": ["IR20", "IR40"]
    },

    # Kolkata
    "South City Mall": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Mall",
        "total_slots": 340,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Netaji Subhas Chandra Bose Airport": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Airport",
        "total_slots": 900,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Victoria Memorial": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Tourist",
        "total_slots": 180,
        "template_slots": ["IR20", "IR40"]
    },

    # Pune
    "Phoenix Marketcity Pune": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 360,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Pune Airport": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Airport",
        "total_slots": 750,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Shaniwar Wada": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Tourist",
        "total_slots": 160,
        "template_slots": ["IR20", "IR40"]
    }
}
SLOT_TEMPLATES = {"IR20":0,"IR40":1,"IR60":2,"IR80":3}

# =====================================
# Models
# =====================================
class ParkingRequest(BaseModel):
    location_name: str
    hour: Optional[int] = None
    day: Optional[int] = None

class SlotData(BaseModel):
    status: str
    nextAvailable: Optional[str] = None

class ParkingResponse(BaseModel):
    location_name: str
    city: str
    state: str
    location_type: str
    total_slots: int
    available_slots: int
    occupied_slots: int
    availability_percentage: float
    status: str
    timestamp: str
    prediction_method: str
    estimated_time: Optional[str] = None
    slots: List[SlotData] = []

# =====================================
# Helper Functions
# =====================================
def get_time():
    now = datetime.now()
    return {
        "hour": now.hour,
        "day": now.weekday(),
        "time_minutes": now.hour * 60 + now.minute
    }

def predict_slot(slot_id, time_minutes, day):
    if model is None:
        return random.choice([0, 1])

    is_weekend = 1 if day >= 5 else 0

    df = pd.DataFrame({
        "Time_Minutes": [time_minutes],
        "Day": [day],
        "Slot_ID": [slot_id],
        "Prev_Status": [0],
        "Is_Weekend": [is_weekend],
        "Rolling_Availability": [0.5]
    })

    # Use probability to simulate realistic slot-by-slot distribution
    prob_available = model.predict_proba(df)[0][1]
    return 1 if random.random() < prob_available else 0
def estimate_time(slot_id):
    # Map tid (0, 1, 2, 3) to the actual categorical keys present in duration.pkl
    key_map = {0: 13, 1: 30, 2: 33, 3: 35}
    actual_key = key_map.get(slot_id, slot_id)
    duration = avg_duration.get(actual_key, 60)
    
    return (
        datetime.now() + timedelta(minutes=int(duration))
    ).strftime("%I:%M %p")

# =====================================
# Core Logic
# =====================================
def aggregate(location, time_features):

    total = location["total_slots"]
    templates = location["template_slots"]

    per_template = total // len(templates)
    available = 0

    slots_data = []
    for t in templates:
        tid = SLOT_TEMPLATES[t]

        for _ in range(per_template):
            offset = random.randint(-10,10)
            tm = max(0,min(1439,time_features["time_minutes"] + offset))

            is_avail = predict_slot(tid, tm, time_features["day"])
            available += is_avail
            
            if is_avail == 0:
                est_time_slot = estimate_time(tid)
                slots_data.append(SlotData(status="occupied", nextAvailable=est_time_slot))
            else:
                slots_data.append(SlotData(status="available", nextAvailable=None))

    while len(slots_data) < total:
        slots_data.append(SlotData(status="available", nextAvailable=None))
        available += 1

    occupied = total - available
    percent = (available/total)*100

    if percent >= 40:
        status = "Available"
    elif percent >= 15:
        status = "Limited"
    else:
        status = "Full"

    est_time = estimate_time(0)
    return available, occupied, percent, status, est_time, slots_data

# =====================================
# API
# =====================================
@app.post("/predict", response_model=ParkingResponse)
def predict_api(req: ParkingRequest):

    loc = None
    # Try exact match first
    if req.location_name in PARKING_LOCATIONS:
        loc = PARKING_LOCATIONS[req.location_name]
    else:
        # Try partial match
        for key, value in PARKING_LOCATIONS.items():
            if req.location_name.lower() in key.lower() or key.lower() in req.location_name.lower():
                loc = value
                break
    
    # Fallback to a default if still not found
    if loc is None:
        loc = {
            "city": "Unknown",
            "state": "Unknown",
            "type": "General",
            "total_slots": 200,
            "template_slots": ["IR20", "IR40", "IR60", "IR80"]
        }

    if req.hour is not None and req.day is not None:
        time_features = {
            "hour": req.hour,
            "day": req.day,
            "time_minutes": req.hour*60
        }
    else:
        time_features = get_time()

    available, occupied, percent, status, est_time, slots_data = aggregate(loc, time_features)

    return ParkingResponse(
        location_name=req.location_name,
        city=loc["city"],
        state=loc["state"],
        location_type=loc["type"],
        total_slots=loc["total_slots"],
        available_slots=available,
        occupied_slots=occupied,
        availability_percentage=round(percent,2),
        status=status,
        timestamp=datetime.now().isoformat(),
        prediction_method="ML Templates",
        estimated_time=est_time,
        slots=slots_data
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)