import React, { useState } from 'react';
import { MapPin, ChevronLeft, Building2, Plane, Train, Briefcase, Camera, ShoppingBag, CheckCircle, XCircle, Clock, Zap, Shield, TrendingUp, MapPinned, Home, LayoutDashboard, Info, Settings } from 'lucide-react';

const parkingData = {
  "Maharashtra": {
    "Mumbai": [
      {
        id: "mum-1",
        name: "Phoenix Palladium Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 320,
        availableSlots: 145,
        occupiedSlots: 175,
        status: "Available",
        percentage: 45.31,
        slots: Array.from({ length: 320 }, (_, i) => ({
          id: `A${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 145 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      },
      {
        id: "mum-2",
        name: "Chhatrapati Shivaji Airport",
        type: "Airport",
        icon: <Plane className="w-5 h-5" />,
        totalSlots: 950,
        availableSlots: 120,
        occupiedSlots: 830,
        status: "Limited",
        percentage: 12.63,
        slots: Array.from({ length: 950 }, (_, i) => ({
          id: `B${Math.floor(i / 40) + 1}-${(i % 40) + 1}`,
          status: i < 120 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      },
      {
        id: "mum-3",
        name: "Gateway of India Complex",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 120,
        availableSlots: 78,
        occupiedSlots: 42,
        status: "Available",
        percentage: 65.0,
        slots: Array.from({ length: 120 }, (_, i) => ({
          id: `C${Math.floor(i / 15) + 1}-${(i % 15) + 1}`,
          status: i < 78 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ],
    "Pune": [
      {
        id: "pune-1",
        name: "Phoenix Marketcity",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 290,
        availableSlots: 198,
        occupiedSlots: 92,
        status: "Available",
        percentage: 68.28,
        slots: Array.from({ length: 290 }, (_, i) => ({
          id: `D${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 198 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      },
      {
        id: "pune-2",
        name: "Shivajinagar Railway Station",
        type: "Railway Station",
        icon: <Train className="w-5 h-5" />,
        totalSlots: 180,
        availableSlots: 54,
        occupiedSlots: 126,
        status: "Limited",
        percentage: 30.0,
        slots: Array.from({ length: 180 }, (_, i) => ({
          id: `E${Math.floor(i / 18) + 1}-${(i % 18) + 1}`,
          status: i < 54 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ],
    "Nagpur": [
      {
        id: "nag-1",
        name: "Eternity Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 200,
        availableSlots: 134,
        occupiedSlots: 66,
        status: "Available",
        percentage: 67.0,
        slots: Array.from({ length: 200 }, (_, i) => ({
          id: `F${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 134 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ]
  },
  "Karnataka": {
    "Bangalore": [
      {
        id: "blr-1",
        name: "UB City Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 280,
        availableSlots: 156,
        occupiedSlots: 124,
        status: "Available",
        percentage: 55.71,
        slots: Array.from({ length: 280 }, (_, i) => ({
          id: `H${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 156 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ],
    "Mysore": [
      {
        id: "mys-1",
        name: "Mysore Palace Complex",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 240,
        availableSlots: 167,
        occupiedSlots: 73,
        status: "Available",
        percentage: 69.58,
        slots: Array.from({ length: 240 }, (_, i) => ({
          id: `K${Math.floor(i / 24) + 1}-${(i % 24) + 1}`,
          status: i < 167 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ]
  },
  "Delhi": {
    "New Delhi": [
      {
        id: "del-1",
        name: "Select Citywalk Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 250,
        availableSlots: 167,
        occupiedSlots: 83,
        status: "Available",
        percentage: 66.8,
        slots: Array.from({ length: 250 }, (_, i) => ({
          id: `M${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 167 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ]
  },
  "Tamil Nadu": {
    "Chennai": [
      {
        id: "che-1",
        name: "Express Avenue Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 265,
        availableSlots: 178,
        occupiedSlots: 87,
        status: "Available",
        percentage: 67.17,
        slots: Array.from({ length: 265 }, (_, i) => ({
          id: `R${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 178 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ]
  },
  "Telangana": {
    "Hyderabad": [
      {
        id: "hyd-1",
        name: "Inorbit Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 310,
        availableSlots: 234,
        occupiedSlots: 76,
        status: "Available",
        percentage: 75.48,
        slots: Array.from({ length: 310 }, (_, i) => ({
          id: `W${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 234 ? 'available' : 'occupied',
          nextAvailable: null
        }))
      }
    ]
  }
};

const Navigation = ({ currentPage, setCurrentPage, navigationHistory, setNavigationHistory }) => {
  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'map', label: 'Map View', icon: <MapPinned className="w-4 h-4" /> }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleBack}
            disabled={navigationHistory.length <= 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
              navigationHistory.length > 1 ? 'bg-white/20 text-white hover:bg-white/30 shadow-lg' : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SmartPark</h1>
          </div>
        </div>
        <div className="flex gap-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setNavigationHistory([...navigationHistory, item.id]); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                currentPage === item.id ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const LocationDetails = ({ place }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">{place.name}</h2>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-indigo-500" /> {place.city}, {place.state}
            </div>
          </div>
          <div className={`px-6 py-2 rounded-2xl font-bold text-white shadow-lg ${
            place.status === 'Available' ? 'bg-green-500' : 
            place.status === 'Limited' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {place.status}
          </div>
        </div>

        {/* CLICK-TO-SHOW PREDICTION CARD */}
        {selectedSlot && (
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md ${
                  selectedSlot.status === 'available' ? 'bg-green-500' : 'bg-slate-400'
                }`}>
                  {selectedSlot.id.split('-').pop()}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg">Slot {selectedSlot.id}</h4>
                  <p className={`text-sm font-bold uppercase tracking-wider ${
                    selectedSlot.status === 'available' ? 'text-green-600' : 'text-slate-500'
                  }`}>
                    Status: {selectedSlot.status}
                  </p>
                </div>
              </div>

             { selectedSlot.status === 'occupied' && (
                <div className="text-right bg-white p-4 rounded-xl border border-indigo-100 shadow-sm w-full overflow-hidden">
                  <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">
                    Predicted Available At</p>
                    <div className="flex items-center justify-end gap-2 min-w-0">
                      <Clock className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 break-words">
                        {selectedSlot.nextAvailable || "Predicting..."}
                        </span>
                        </div>
                        </div>
                        )}

              <button onClick={() => setSelectedSlot(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                <XCircle className="w-8 h-8 text-slate-300" />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-800">Slot-Wise Availability</h3>
          <div className="flex gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-green-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div> Available
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <div className="w-3 h-3 bg-slate-300 rounded-full"></div> Occupied
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-3 max-h-[400px] overflow-y-auto p-2 scrollbar-thin">
          {place.slots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 
                ${selectedSlot?.id === slot.id ? 'scale-110 ring-4 ring-indigo-200 z-10 border-indigo-500' : 'hover:scale-105 shadow-sm'}
                ${slot.status === 'available' 
                  ? 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
            >
              {slot.id.split('-').pop()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MapView = ({ setCurrentPage, setSelectedPlace, setNavigationHistory, navigationHistory }) => {
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const states = Object.keys(parkingData);
  const cities = Object.keys(parkingData[selectedState] || {});
  const places = parkingData[selectedState]?.[selectedCity] || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="flex h-[calc(100vh-6rem)]">
        <div className="w-80 bg-white border-r-2 border-slate-100 p-6 overflow-y-auto shadow-2xl z-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-600">
            <MapPinned /> Location Filters
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">Select State</label>
              <select 
                value={selectedState} 
                onChange={(e) => {setSelectedState(e.target.value); setSelectedCity(Object.keys(parkingData[e.target.value])[0])}}
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-2">Select City</label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500"
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="pt-4 border-t-2 border-slate-50">
              <label className="block text-xs font-black text-slate-400 uppercase mb-4">Places Found ({places.length})</label>
              <div className="space-y-3">
                {places.map(place => (
                  <button
                    key={place.id}
                    onClick={() => {
                      setSelectedPlace({ ...place, state: selectedState, city: selectedCity });
                      setCurrentPage('location-details');
                      setNavigationHistory([...navigationHistory, 'location-details']);
                    }}
                    className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 transition-all bg-white hover:shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform">{place.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{place.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{place.type} • {place.status}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-50 flex items-center justify-center relative">
            <div className="text-center">
                <MapPin className="w-16 h-16 text-indigo-200 mx-auto mb-4 animate-bounce" />
                <p className="text-indigo-300 font-black uppercase tracking-widest">Interactive Map Placeholder</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [navigationHistory, setNavigationHistory] = useState(['home']);
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        navigationHistory={navigationHistory} 
        setNavigationHistory={setNavigationHistory} 
      />

      {currentPage === 'home' && (
        <div className="pt-48 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-8xl font-black text-slate-800 mb-8 tracking-tighter animate-fadeIn">
            Parking <span className="text-indigo-600">Reimagined.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium mb-12">
            AI-driven occupancy forecasting and real-time availability for 5 major states and dozens of cities across India.
          </p>
          <button 
            onClick={() => {setCurrentPage('map'); setNavigationHistory(['home', 'map'])}}
            className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-indigo-600 hover:scale-105 transition-all shadow-2xl"
          >
            Explore Map View
          </button>
        </div>
      )}

      {currentPage === 'map' && (
        <MapView 
          setCurrentPage={setCurrentPage} 
          setSelectedPlace={setSelectedPlace} 
          setNavigationHistory={setNavigationHistory} 
          navigationHistory={navigationHistory} 
        />
      )}

      {currentPage === 'location-details' && selectedPlace && (
        <LocationDetails place={selectedPlace} />
      )}
    </div>
  );
};

export default App;