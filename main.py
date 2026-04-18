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
from datetime import datetime
import random

# =====================================
# Initialize FastAPI App
# =====================================
app = FastAPI(
    title="Smart Parking Availability API",
    description="Predicts parking availability across Indian cities using ML behavior templates",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# Load Trained ML Model
# =====================================
try:
    model = joblib.load("smart_parking_model.pkl")
    print("✓ ML Model loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None

# =====================================
# Real Location Database
# =====================================
PARKING_LOCATIONS = {
    # Delhi NCR
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
        "type": "Tourist Spot",
        "total_slots": 150,
        "template_slots": ["IR20", "IR40"]
    },
    
    # Mumbai
    "Phoenix Palladium, Mumbai": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 320,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Chhatrapati Shivaji Terminal, Mumbai": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Airport",
        "total_slots": 950,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Gateway of India, Mumbai": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "type": "Tourist Spot",
        "total_slots": 120,
        "template_slots": ["IR20", "IR60"]
    },
    
    # Bangalore
    "UB City Mall, Bangalore": {
        "city": "Bangalore",
        "state": "Karnataka",
        "type": "Mall",
        "total_slots": 280,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Kempegowda International Airport, Bangalore": {
        "city": "Bangalore",
        "state": "Karnataka",
        "type": "Airport",
        "total_slots": 1100,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Lalbagh Botanical Garden, Bangalore": {
        "city": "Bangalore",
        "state": "Karnataka",
        "type": "Tourist Spot",
        "total_slots": 200,
        "template_slots": ["IR20", "IR40", "IR60"]
    },
    
    # Hyderabad
    "Inorbit Mall, Hyderabad": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Mall",
        "total_slots": 310,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Rajiv Gandhi International Airport, Hyderabad": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Airport",
        "total_slots": 850,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Charminar, Hyderabad": {
        "city": "Hyderabad",
        "state": "Telangana",
        "type": "Tourist Spot",
        "total_slots": 90,
        "template_slots": ["IR20", "IR40"]
    },
    
    # Chennai
    "Express Avenue Mall, Chennai": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Mall",
        "total_slots": 265,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Chennai International Airport, Chennai": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Airport",
        "total_slots": 720,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Marina Beach, Chennai": {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "type": "Tourist Spot",
        "total_slots": 180,
        "template_slots": ["IR20", "IR40", "IR60"]
    },
    
    # Kolkata
    "South City Mall, Kolkata": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Mall",
        "total_slots": 240,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Netaji Subhas Chandra Bose International Airport, Kolkata": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Airport",
        "total_slots": 680,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Victoria Memorial, Kolkata": {
        "city": "Kolkata",
        "state": "West Bengal",
        "type": "Tourist Spot",
        "total_slots": 140,
        "template_slots": ["IR20", "IR60"]
    },
    
    # Pune
    "Phoenix Marketcity, Pune": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Mall",
        "total_slots": 290,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Shaniwar Wada, Pune": {
        "city": "Pune",
        "state": "Maharashtra",
        "type": "Tourist Spot",
        "total_slots": 110,
        "template_slots": ["IR20", "IR40"]
    },
    
    # Jaipur
    "World Trade Park, Jaipur": {
        "city": "Jaipur",
        "state": "Rajasthan",
        "type": "Mall",
        "total_slots": 220,
        "template_slots": ["IR20", "IR40", "IR60"]
    },
    "Hawa Mahal, Jaipur": {
        "city": "Jaipur",
        "state": "Rajasthan",
        "type": "Tourist Spot",
        "total_slots": 80,
        "template_slots": ["IR20", "IR40"]
    },
    "Amber Fort, Jaipur": {
        "city": "Jaipur",
        "state": "Rajasthan",
        "type": "Tourist Spot",
        "total_slots": 160,
        "template_slots": ["IR20", "IR40", "IR60"]
    },
    
    # Ahmedabad
    "Ahmedabad One Mall, Ahmedabad": {
        "city": "Ahmedabad",
        "state": "Gujarat",
        "type": "Mall",
        "total_slots": 270,
        "template_slots": ["IR20", "IR40", "IR60", "IR80"]
    },
    "Sabarmati Ashram, Ahmedabad": {
        "city": "Ahmedabad",
        "state": "Gujarat",
        "type": "Tourist Spot",
        "total_slots": 95,
        "template_slots": ["IR20", "IR40"]
    },
}

# Template slot mapping (from your trained model)
# These represent the behavior patterns learned from real sensors
SLOT_TEMPLATES = {
    "IR20": 0,
    "IR40": 1,
    "IR60": 2,
    "IR80": 3,
}

# =====================================
# Pydantic Models
# =====================================
class ParkingRequest(BaseModel):
    location_name: str
    hour: Optional[int] = None  # Override current hour for testing
    day: Optional[int] = None   # Override current day for testing

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

class LocationListResponse(BaseModel):
    locations: List[Dict[str, str]]
    total_count: int

# =====================================
# Helper Functions
# =====================================
def get_current_time_features():
    """Extract time features from current datetime"""
    now = datetime.now()
    hour = now.hour
    minute = now.minute
    day = now.weekday()  # 0 = Monday
    time_minutes = hour * 60 + minute
    
    return {
        'hour': hour,
        'minute': minute,
        'day': day,
        'time_minutes': time_minutes
    }

def predict_slot_availability(slot_template_id: int, time_minutes: int, day: int) -> int:
    """
    Predict if a virtual slot is available using ML model behavior templates
    
    Args:
        slot_template_id: The template ID (0-3 for IR20, IR40, IR60, IR80)
        time_minutes: Minutes since midnight
        day: Day of week (0=Monday)
    
    Returns:
        1 if available, 0 if occupied
    """
    if model is None:
        # Fallback: random prediction if model not loaded
        return random.choice([0, 1])
    
    # Create feature vector matching training data format
    features = pd.DataFrame({
        'Time_Minutes': [time_minutes],
        'Day': [day],
        'Slot_ID': [slot_template_id]
    })
    
    # Predict using ML model
    prediction = model.predict(features)[0]
    return int(prediction)

def aggregate_location_availability(location_config: dict, time_features: dict) -> dict:
    """
    Aggregate predictions for all virtual slots in a location
    
    Args:
        location_config: Location configuration with total_slots and template_slots
        time_features: Current time features (hour, day, time_minutes)
    
    Returns:
        Dictionary with aggregated availability metrics
    """
    total_slots = location_config['total_slots']
    template_slots = location_config['template_slots']
    
    # Distribute total slots across templates
    slots_per_template = total_slots // len(template_slots)
    remaining_slots = total_slots % len(template_slots)
    
    available_count = 0
    
    # Predict for each virtual slot
    for i, template_name in enumerate(template_slots):
        template_id = SLOT_TEMPLATES.get(template_name, 0)
        
        # Calculate how many virtual slots use this template
        num_virtual_slots = slots_per_template
        if i < remaining_slots:
            num_virtual_slots += 1
        
        # Run prediction for each virtual slot using this template
        for _ in range(num_virtual_slots):
            # Add small random variation to avoid all slots having identical predictions
            time_offset = random.randint(-15, 15)  # ±15 minutes variation
            adjusted_time = max(0, min(1439, time_features['time_minutes'] + time_offset))
            
            is_available = predict_slot_availability(
                template_id,
                adjusted_time,
                time_features['day']
            )
            available_count += is_available
    
    occupied_count = total_slots - available_count
    availability_percentage = (available_count / total_slots) * 100
    
    # Determine status
    if availability_percentage >= 40:
        status = "Available"
    elif availability_percentage >= 15:
        status = "Limited"
    else:
        status = "Full"
    
    return {
        'available_slots': available_count,
        'occupied_slots': occupied_count,
        'availability_percentage': round(availability_percentage, 2),
        'status': status
    }

# =====================================
# API Endpoints
# =====================================
@app.get("/")
def read_root():
    """API health check"""
    return {
        "message": "Smart Parking Availability API",
        "status": "operational",
        "model_loaded": model is not None,
        "total_locations": len(PARKING_LOCATIONS)
    }

@app.get("/locations", response_model=LocationListResponse)
def get_all_locations():
    """Get list of all available parking locations"""
    locations = [
        {
            "location_name": name,
            "city": config['city'],
            "state": config['state'],
            "type": config['type'],
            "total_slots": config['total_slots']
        }
        for name, config in PARKING_LOCATIONS.items()
    ]
    
    return {
        "locations": locations,
        "total_count": len(locations)
    }

@app.post("/predict", response_model=ParkingResponse)
def predict_parking_availability(request: ParkingRequest):
    """
    Predict parking availability for a specific location
    
    Uses ML model as behavior templates for virtual slots
    """
    # Validate location exists
    if request.location_name not in PARKING_LOCATIONS:
        raise HTTPException(
            status_code=404,
            detail=f"Location '{request.location_name}' not found. Use /locations to see available locations."
        )
    
    # Get location configuration
    location_config = PARKING_LOCATIONS[request.location_name]
    
    # Get time features (use override if provided, else current time)
    if request.hour is not None and request.day is not None:
        time_features = {
            'hour': request.hour,
            'minute': 0,
            'day': request.day,
            'time_minutes': request.hour * 60
        }
    else:
        time_features = get_current_time_features()
    
    # Aggregate predictions for all virtual slots
    availability = aggregate_location_availability(location_config, time_features)
    
    # Build response
    response = ParkingResponse(
        location_name=request.location_name,
        city=location_config['city'],
        state=location_config['state'],
        location_type=location_config['type'],
        total_slots=location_config['total_slots'],
        available_slots=availability['available_slots'],
        occupied_slots=availability['occupied_slots'],
        availability_percentage=availability['availability_percentage'],
        status=availability['status'],
        timestamp=datetime.now().isoformat(),
        prediction_method="ML Behavior Templates"
    )
    
    return response

@app.get("/locations/{city}")
def get_locations_by_city(city: str):
    """Get all parking locations in a specific city"""
    city_locations = {
        name: config
        for name, config in PARKING_LOCATIONS.items()
        if config['city'].lower() == city.lower()
    }
    
    if not city_locations:
        raise HTTPException(
            status_code=404,
            detail=f"No locations found in city '{city}'"
        )
    
    return {
        "city": city,
        "locations": city_locations,
        "count": len(city_locations)
    }

@app.get("/stats")
def get_system_stats():
    """Get overall system statistics"""
    cities = set(config['city'] for config in PARKING_LOCATIONS.values())
    states = set(config['state'] for config in PARKING_LOCATIONS.values())
    types = set(config['type'] for config in PARKING_LOCATIONS.values())
    total_capacity = sum(config['total_slots'] for config in PARKING_LOCATIONS.values())
    
    return {
        "total_locations": len(PARKING_LOCATIONS),
        "total_parking_capacity": total_capacity,
        "cities_covered": len(cities),
        "states_covered": len(states),
        "location_types": list(types),
        "ml_model_loaded": model is not None,
        "behavior_templates": list(SLOT_TEMPLATES.keys())
    }

# =====================================
# Run with: uvicorn main:app --reload
# =====================================
