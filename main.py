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
    duration_model = joblib.load("duration_model.pkl")
    print("Duration model loaded")
except:
    duration_model = None
    print("Duration model not loaded")
# =====================================
# Locations
# =====================================
PARKING_LOCATIONS = {
    # Delhi
    "Select Citywalk Mall, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Mall",
        "total_slots": 250
    },
    "IGI Airport T3, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Airport",
        "total_slots": 800
    },
    "India Gate, Delhi": {
        "city": "Delhi",
        "state": "Delhi",
        "type": "Tourist",
        "total_slots": 150
    },

    # Mumbai
    "Phoenix Palladium Mall": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 320
    },
    "Chhatrapati Shivaji Airport": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Airport",
        "total_slots": 950
    },
    "Gateway of India": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Tourist",
        "total_slots": 180
    },

    # Bengaluru
    "Orion Mall": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Mall",
        "total_slots": 400
    },
    "Kempegowda Airport": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Airport",
        "total_slots": 1200
    },
    "Lalbagh Botanical Garden": {
        "city": "Bengaluru",
        "state": "Karnataka",
        "type": "Tourist",
        "total_slots": 220
    },

    # Hyderabad
    "Inorbit Mall Hyderabad": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Mall",
        "total_slots": 380
    },
    "Rajiv Gandhi International Airport": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Airport",
        "total_slots": 1100
    },
    "Charminar": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Tourist",
        "total_slots": 200
    },

    # Chennai
    "Express Avenue Mall": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Mall",
        "total_slots": 350
    },
    "Chennai International Airport": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Airport",
        "total_slots": 1000
    },
    "Marina Beach": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Tourist",
        "total_slots": 250
    },

    # Kolkata
    "South City Mall": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Mall",
        "total_slots": 340
    },
    "Netaji Subhas Chandra Bose Airport": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Airport",
        "total_slots": 900
    },
    "Victoria Memorial": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Tourist",
        "total_slots": 180
    },

    # Pune
    "Phoenix Marketcity Pune": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 360
    },
    "Pune Airport": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Airport",
        "total_slots": 750
    },
    "Shaniwar Wada": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Tourist",
        "total_slots": 160
    }
}
# Template IDs map to distinct Birmingham car park subsets (0-29 range)
# Mall venues   → profiles 4-7  (mid-range, moderate occupancy)
# Airport venues → profiles 8-11 (high-volume, long stays)
# Tourist venues → profiles 12-13 (short bursts, high turnover)
SLOT_TEMPLATES = {
    # Mall templates
    "IR20": 4, "IR40": 5, "IR60": 6, "IR80": 7,
    # Airport templates (separate namespace in UI)
    "AIRPORT_A": 8, "AIRPORT_B": 9, "AIRPORT_C": 10, "AIRPORT_D": 11,
    # Tourist templates
    "TOURIST_A": 12, "TOURIST_B": 13,
}

# Venue-type → template slot names
VENUE_TEMPLATES = {
    "Mall":    ["IR20", "IR40", "IR60", "IR80"],
    "Airport": ["AIRPORT_A", "AIRPORT_B", "AIRPORT_C", "AIRPORT_D"],
    "Tourist": ["TOURIST_A", "TOURIST_B"],
    "General": ["IR20", "IR40", "IR60", "IR80"],
}

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
def estimate_time(slot_id, time_minutes, day):
    # slot_id already IS the Birmingham car park index (0-29), passed via SLOT_TEMPLATES
    # Clamp to valid range as a safety net
    actual_key = int(slot_id) % 30
    
    if duration_model is None:
        duration = 60
    else:
        is_weekend = 1 if day >= 5 else 0
        df = pd.DataFrame({
            "Time_Minutes": [time_minutes],
            "Day": [day],
            "Slot_ID": [actual_key],
            "Is_Weekend": [is_weekend]
        })
        duration = duration_model.predict(df)[0]
        
        # Add natural variance: The ML model predicts the *mean* expected duration.
        # In reality, parking times are distributed around this mean.
        # We add a random spread (e.g., -15 to +30 minutes) so not all slots show the exact same minute.
        variance = random.randint(-15, 30)
        duration = max(1, duration + variance)
    
    return (
        datetime.now() + timedelta(minutes=int(duration))
    ).strftime("%I:%M %p")

# =====================================
# Core Logic (Vectorized Batch Prediction for Instant Speed)
# =====================================
def aggregate(location, time_features):

    total = location["total_slots"]
    venue_type = location.get("type", "General")

    # Resolve templates dynamically from venue type
    templates = VENUE_TEMPLATES.get(venue_type, VENUE_TEMPLATES["General"])
    num_templates = len(templates)
    per_template = total // num_templates

    day = time_features["day"]
    base_tm = time_features["time_minutes"]
    is_weekend = 1 if day >= 5 else 0

    # Build template slot IDs array for all slots
    slot_ids = []
    for t in templates:
        tid = SLOT_TEMPLATES[t]
        slot_ids.extend([tid] * per_template)
    
    # Fill any remainder up to total using the first template
    if len(slot_ids) < total:
        slot_ids.extend([SLOT_TEMPLATES[templates[0]]] * (total - len(slot_ids)))
    
    slot_ids = np.array(slot_ids[:total], dtype=int)

    # Individual random time offsets per slot (-10 to +10 mins) for realism
    offsets = np.random.randint(-10, 11, size=total)
    time_minutes = np.clip(base_tm + offsets, 0, 1439)

    # 1. High-speed Batch Prediction of Availability
    if model is not None:
        batch_df = pd.DataFrame({
            "Time_Minutes": time_minutes,
            "Day": [day] * total,
            "Slot_ID": slot_ids,
            "Prev_Status": [0] * total,
            "Is_Weekend": [is_weekend] * total,
            "Rolling_Availability": [0.5] * total
        })
        probs = model.predict_proba(batch_df)[:, 1]
        availabilities = (np.random.rand(total) < probs).astype(int)
    else:
        availabilities = np.random.choice([0, 1], size=total)

    # 2. High-speed Batch Prediction of Durations for Occupied Slots
    occupied_indices = np.where(availabilities == 0)[0]
    next_avail_map = {}

    now = datetime.now()
    if len(occupied_indices) > 0:
        if duration_model is not None:
            dur_df = pd.DataFrame({
                "Time_Minutes": time_minutes[occupied_indices],
                "Day": [day] * len(occupied_indices),
                "Slot_ID": slot_ids[occupied_indices] % 30,
                "Is_Weekend": [is_weekend] * len(occupied_indices)
            })
            pred_durations = duration_model.predict(dur_df)
            variances = np.random.randint(-15, 31, size=len(occupied_indices))
            durations = np.maximum(1, pred_durations + variances)
        else:
            durations = [60] * len(occupied_indices)

        for idx, dur in zip(occupied_indices, durations):
            next_avail_map[idx] = (now + timedelta(minutes=int(dur))).strftime("%I:%M %p")

    # Build slot objects for UI
    slots_data = []
    for i in range(total):
        if availabilities[i] == 1:
            slots_data.append(SlotData(status="available", nextAvailable=None))
        else:
            slots_data.append(SlotData(status="occupied", nextAvailable=next_avail_map.get(i)))

    available = int(np.sum(availabilities))
    occupied = total - available
    percent = (available / total) * 100

    if percent >= 40:
        status = "Available"
    elif percent >= 15:
        status = "Limited"
    else:
        status = "Full"

    # Overall estimated checkout time for summary header
    primary_slot = SLOT_TEMPLATES[templates[0]] % 30
    est_time = estimate_time(primary_slot, base_tm, day)

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
            "total_slots": 200
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