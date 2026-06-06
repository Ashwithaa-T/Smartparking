import React, { useState } from 'react';
import { MapPin, ChevronLeft, Building2, Plane, Train, Briefcase, Camera, ShoppingBag, CheckCircle, XCircle, Clock, Zap, Shield, TrendingUp, MapPinned, Home, LayoutDashboard, Info, Settings } from 'lucide-react';

// Enhanced data structure: State → Multiple Cities → Places
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
          nextAvailable: i >= 145 ? null : null
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
          nextAvailable: i >= 120 ? null : null
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
          nextAvailable: i >= 78 ? null : null
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
          nextAvailable: i >= 198 ? null : null
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
          nextAvailable: i >= 54 ? null : null
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
          nextAvailable: i >= 134 ? null : null
        }))
      },
      {
        id: "nag-2",
        name: "Dr. Ambedkar Square",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 95,
        availableSlots: 12,
        occupiedSlots: 83,
        status: "Full",
        percentage: 12.63,
        slots: Array.from({ length: 95 }, (_, i) => ({
          id: `G${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
          status: i < 12 ? 'available' : 'occupied',
          nextAvailable: i >= 12 ? null : null
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
          nextAvailable: i >= 156 ? null : null
        }))
      },
      {
        id: "blr-2",
        name: "Kempegowda Airport",
        type: "Airport",
        icon: <Plane className="w-5 h-5" />,
        totalSlots: 1100,
        availableSlots: 89,
        occupiedSlots: 1011,
        status: "Full",
        percentage: 8.09,
        slots: Array.from({ length: 1100 }, (_, i) => ({
          id: `I${Math.floor(i / 50) + 1}-${(i % 50) + 1}`,
          status: i < 89 ? 'available' : 'occupied',
          nextAvailable: i >= 89 ? null : null
        }))
      },
      {
        id: "blr-3",
        name: "Electronic City IT Hub",
        type: "IT Park",
        icon: <Briefcase className="w-5 h-5" />,
        totalSlots: 520,
        availableSlots: 287,
        occupiedSlots: 233,
        status: "Available",
        percentage: 55.19,
        slots: Array.from({ length: 520 }, (_, i) => ({
          id: `J${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
          status: i < 287 ? 'available' : 'occupied',
          nextAvailable: i >= 287 ? null : null
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
          nextAvailable: i >= 167 ? null : null
        }))
      },
      {
        id: "mys-2",
        name: "Forum Centre City Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 175,
        availableSlots: 98,
        occupiedSlots: 77,
        status: "Available",
        percentage: 56.0,
        slots: Array.from({ length: 175 }, (_, i) => ({
          id: `L${Math.floor(i / 18) + 1}-${(i % 18) + 1}`,
          status: i < 98 ? 'available' : 'occupied',
          nextAvailable: i >= 98 ? null : null
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
          nextAvailable: i >= 167 ? null : null
        }))
      },
      {
        id: "del-2",
        name: "IGI Airport Terminal 3",
        type: "Airport",
        icon: <Plane className="w-5 h-5" />,
        totalSlots: 800,
        availableSlots: 98,
        occupiedSlots: 702,
        status: "Limited",
        percentage: 12.25,
        slots: Array.from({ length: 800 }, (_, i) => ({
          id: `N${Math.floor(i / 40) + 1}-${(i % 40) + 1}`,
          status: i < 98 ? 'available' : 'occupied',
          nextAvailable: i >= 98 ? null : null
        }))
      },
      {
        id: "del-3",
        name: "India Gate Area",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 150,
        availableSlots: 89,
        occupiedSlots: 61,
        status: "Available",
        percentage: 59.33,
        slots: Array.from({ length: 150 }, (_, i) => ({
          id: `O${Math.floor(i / 15) + 1}-${(i % 15) + 1}`,
          status: i < 89 ? 'available' : 'occupied',
          nextAvailable: i >= 89 ? null : null
        }))
      }
    ],
    "Gurgaon": [
      {
        id: "gur-1",
        name: "Cyber Hub",
        type: "IT Park",
        icon: <Briefcase className="w-5 h-5" />,
        totalSlots: 680,
        availableSlots: 89,
        occupiedSlots: 591,
        status: "Limited",
        percentage: 13.09,
        slots: Array.from({ length: 680 }, (_, i) => ({
          id: `P${Math.floor(i / 35) + 1}-${(i % 35) + 1}`,
          status: i < 89 ? 'available' : 'occupied',
          nextAvailable: i >= 89 ? null : null
        }))
      },
      {
        id: "gur-2",
        name: "Ambience Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 410,
        availableSlots: 267,
        occupiedSlots: 143,
        status: "Available",
        percentage: 65.12,
        slots: Array.from({ length: 410 }, (_, i) => ({
          id: `Q${Math.floor(i / 25) + 1}-${(i % 25) + 1}`,
          status: i < 267 ? 'available' : 'occupied',
          nextAvailable: i >= 267 ? null : null
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
          nextAvailable: i >= 178 ? null : null
        }))
      },
      {
        id: "che-2",
        name: "Chennai Central Station",
        type: "Railway Station",
        icon: <Train className="w-5 h-5" />,
        totalSlots: 220,
        availableSlots: 67,
        occupiedSlots: 153,
        status: "Limited",
        percentage: 30.45,
        slots: Array.from({ length: 220 }, (_, i) => ({
          id: `S${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          status: i < 67 ? 'available' : 'occupied',
          nextAvailable: i >= 67 ? null : null
        }))
      },
      {
        id: "che-3",
        name: "Marina Beach",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 180,
        availableSlots: 123,
        occupiedSlots: 57,
        status: "Available",
        percentage: 68.33,
        slots: Array.from({ length: 180 }, (_, i) => ({
          id: `T${Math.floor(i / 18) + 1}-${(i % 18) + 1}`,
          status: i < 123 ? 'available' : 'occupied',
          nextAvailable: i >= 123 ? null : null
        }))
      }
    ],
    "Coimbatore": [
      {
        id: "coi-1",
        name: "Brookefields Mall",
        type: "Mall",
        icon: <ShoppingBag className="w-5 h-5" />,
        totalSlots: 195,
        availableSlots: 127,
        occupiedSlots: 68,
        status: "Available",
        percentage: 65.13,
        slots: Array.from({ length: 195 }, (_, i) => ({
          id: `U${Math.floor(i / 18) + 1}-${(i % 18) + 1}`,
          status: i < 127 ? 'available' : 'occupied',
          nextAvailable: i >= 127 ? null : null
        }))
      },
      {
        id: "coi-2",
        name: "Tidel Park IT Hub",
        type: "IT Park",
        icon: <Briefcase className="w-5 h-5" />,
        totalSlots: 340,
        availableSlots: 45,
        occupiedSlots: 295,
        status: "Limited",
        percentage: 13.24,
        slots: Array.from({ length: 340 }, (_, i) => ({
          id: `V${Math.floor(i / 22) + 1}-${(i % 22) + 1}`,
          status: i < 45 ? 'available' : 'occupied',
          nextAvailable: i >= 45 ? null : null
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
          nextAvailable: i >= 234 ? null : null
        }))
      },
      {
        id: "hyd-2",
        name: "Rajiv Gandhi Airport",
        type: "Airport",
        icon: <Plane className="w-5 h-5" />,
        totalSlots: 850,
        availableSlots: 256,
        occupiedSlots: 594,
        status: "Limited",
        percentage: 30.12,
        slots: Array.from({ length: 850 }, (_, i) => ({
          id: `X${Math.floor(i / 40) + 1}-${(i % 40) + 1}`,
          status: i < 256 ? 'available' : 'occupied',
          nextAvailable: i >= 256 ? null : null
        }))
      },
      {
        id: "hyd-3",
        name: "HITEC City",
        type: "IT Park",
        icon: <Briefcase className="w-5 h-5" />,
        totalSlots: 640,
        availableSlots: 23,
        occupiedSlots: 617,
        status: "Full",
        percentage: 3.59,
        slots: Array.from({ length: 640 }, (_, i) => ({
          id: `Y${Math.floor(i / 35) + 1}-${(i % 35) + 1}`,
          status: i < 23 ? 'available' : 'occupied',
          nextAvailable: i >= 23 ? null : null
        }))
      }
    ],
    "Warangal": [
      {
        id: "war-1",
        name: "Bhadrakali Temple Area",
        type: "Tourist Spot",
        icon: <Camera className="w-5 h-5" />,
        totalSlots: 130,
        availableSlots: 87,
        occupiedSlots: 43,
        status: "Available",
        percentage: 66.92,
        slots: Array.from({ length: 130 }, (_, i) => ({
          id: `Z${Math.floor(i / 14) + 1}-${(i % 14) + 1}`,
          status: i < 87 ? 'available' : 'occupied',
          nextAvailable: i >= 87 ? null : null
        }))
      },
      {
        id: "war-2",
        name: "Warangal Railway Station",
        type: "Railway Station",
        icon: <Train className="w-5 h-5" />,
        totalSlots: 110,
        availableSlots: 56,
        occupiedSlots: 54,
        status: "Available",
        percentage: 50.91,
        slots: Array.from({ length: 110 }, (_, i) => ({
          id: `AA${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
          status: i < 56 ? 'available' : 'occupied',
          nextAvailable: i >= 56 ? null : null
        }))
      }
    ]
  }
};

// Navigation Component with Creative Buttons
const Navigation = ({ currentPage, setCurrentPage, navigationHistory, setNavigationHistory }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, gradient: 'from-purple-500 to-pink-500' },
    { id: 'map', label: 'Map View', icon: <MapPinned className="w-4 h-4" />, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, gradient: 'from-green-500 to-teal-500' },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" />, gradient: 'from-orange-500 to-red-500' },
    { id: 'how-it-works', label: 'How It Works', icon: <Settings className="w-4 h-4" />, gradient: 'from-indigo-500 to-purple-500' }
  ];

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Back Button - Creative Design */}
            <button
              onClick={handleBack}
              disabled={navigationHistory.length <= 1}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                navigationHistory.length > 1
                  ? 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 hover:scale-105 shadow-lg'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${navigationHistory.length > 1 ? 'group-hover:-translate-x-1' : ''}`} />
              <span>Back</span>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-xl transform hover:rotate-12 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">SmartPark</h1>
                <p className="text-xs text-purple-100">AI Parking System</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Creative Buttons */}
          <div className="flex items-center gap-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setNavigationHistory([...navigationHistory, item.id]);
                }}
                className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                  currentPage === item.id
                    ? 'bg-white text-purple-600 shadow-xl scale-105'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                {currentPage !== item.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                )}
                <div className="relative flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Home Page with Creative Background
const HomePage = ({ setCurrentPage, setNavigationHistory, navigationHistory }) => {
  const navigate = (page) => {
    setCurrentPage(page);
    setNavigationHistory([...navigationHistory, page]);
  };

  return (
    <div className="min-h-screen pt-24 px-6 relative overflow-hidden">
      {/* Creative Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight animate-fadeIn">
            Smart Parking Availability System
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
           AI-powered parking availability prediction across India. Find likely available parking quickly, 
           save time, and make smarter decisions using data-driven insights.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center mb-16">
            <button 
              onClick={() => navigate('map')}
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 hover:-rotate-2 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Explore Parking Locations
                <MapPin className="w-5 h-5 group-hover:animate-bounce" />
              </span>
            </button>
            <button 
              onClick={() => navigate('dashboard')}
              className="group px-10 py-5 bg-white border-4 border-purple-600 rounded-2xl text-purple-600 font-bold text-lg hover:bg-purple-600 hover:text-white transform hover:scale-110 hover:rotate-2 transition-all duration-300 shadow-xl"
            >
              Check Availability Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 transform hover:scale-105 hover:-rotate-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Instant Predictions</h3>
            <p className="text-gray-600 leading-relaxed">
              Get fast parking availability predictions powered by machine learning and historical data analysis.
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Multi-City Coverage</h3>
            <p className="text-gray-600 leading-relaxed">
              Comprehensive coverage across major Indian cities with thousands of parking slots
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 transform hover:scale-105 hover:rotate-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Smart Predictions</h3>
            <p className="text-gray-600 leading-relaxed">
              Next available slot timing and occupancy forecasts for better planning
            </p>
          </div>
        </div>

        {/* Stats Bar with Creative Design */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2 animate-pulse">8,340</div>
              <div className="text-purple-100 font-medium">Total Slots</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2 animate-pulse">19</div>
              <div className="text-purple-100 font-medium">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2 animate-pulse">9</div>
              <div className="text-purple-100 font-medium">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2 animate-pulse">24/7</div>
              <div className="text-purple-100 font-medium">Live Updates</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

// Map View Component (FIXED)
const MapView = ({ setCurrentPage, setSelectedPlace, setNavigationHistory, navigationHistory }) => {
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const states = Object.keys(parkingData);
  const cities = parkingData[selectedState] ? Object.keys(parkingData[selectedState]) : [];
  const places = parkingData[selectedState]?.[selectedCity] || [];

  // Fix: When state changes, update city to first available city
  const handleStateChange = (newState) => {
    setSelectedState(newState);
    const firstCity = Object.keys(parkingData[newState])[0];
    setSelectedCity(firstCity);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Limited': return 'bg-yellow-500';
      case 'Full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const viewPlaceDetails = async (place) => {
    let updatedPlace = { ...place, state: selectedState, city: selectedCity };
    try {
      const response = await fetch('http://localhost:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location_name: place.name })
      });
      if (response.ok) {
        const data = await response.json();
        updatedPlace = {
          ...updatedPlace,
          availableSlots: data.available_slots,
          occupiedSlots: data.occupied_slots,
          percentage: data.availability_percentage,
          status: data.status,
          estimated_time: data.estimated_time,
          totalSlots: data.total_slots,
          slots: data.slots.map((s, i) => ({
            id: `A${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
            status: s.status,
            nextAvailable: s.nextAvailable
          }))
        };
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
    setSelectedPlace(updatedPlace);
    setCurrentPage('location-details');
    setNavigationHistory([...navigationHistory, 'location-details']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24">
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Sidebar Filters */}
        <div className="w-80 bg-white/80 backdrop-blur-lg border-r-2 border-purple-200 overflow-y-auto shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPinned className="w-6 h-6 text-purple-600" />
              Filters
            </h2>

            {/* State Filter */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Location List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Places ({places.length})
              </h3>
              {places.map(place => (
                <button
                  key={place.id}
                  onClick={() => viewPlaceDetails(place)}
                  className="w-full text-left p-4 bg-gradient-to-br from-white to-purple-50 hover:from-purple-100 hover:to-pink-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-purple-600">{place.icon}</div>
                      <h4 className="font-bold text-gray-800">{place.name}</h4>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(place.status)} text-white shadow-md`}>
                      {place.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2 font-medium">{place.type}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-600 font-bold">{place.availableSlots}/{place.totalSlots} slots</span>
                    <span className="text-gray-500 font-semibold">{place.percentage.toFixed(1)}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Display */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg px-8 py-4 rounded-2xl shadow-2xl border-2 border-purple-300">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-gray-800">
                    🗺️ {selectedCity}, {selectedState} - {places.length} Locations
                  </p>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                    🔮 Predictive
                  </span>
                </div>
              </div>

              {/* Map Grid */}
              <div className="grid grid-cols-3 gap-8 h-full items-center justify-items-center p-16">
                {places.map((place, index) => (
                  <button
                    key={place.id}
                    onClick={() => viewPlaceDetails(place)}
                    className="group relative transform hover:scale-125 transition-all duration-300"
                  >
                    {/* Marker Pin */}
                    <div className={`w-20 h-20 rounded-full ${getStatusColor(place.status)} flex items-center justify-center shadow-2xl ring-4 ring-white group-hover:ring-purple-400 transition-all animate-bounce`}>
                      <MapPin className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-lg px-5 py-4 rounded-2xl shadow-2xl border-2 border-purple-300 whitespace-nowrap">
                        <p className="font-bold text-gray-800 text-sm">{place.name}</p>
                        <p className="text-xs text-gray-600 font-medium">{place.type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(place.status)} text-white`}>
                            {place.status}
                          </span>
                          <span className="text-xs text-purple-600 font-bold">{place.availableSlots}/{place.totalSlots}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-2xl border-2 border-purple-300">
                <h4 className="text-gray-800 font-bold mb-3 text-sm">Status Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 shadow-md"></div>
                    <span className="text-sm text-gray-700 font-medium">Available (≥40%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 shadow-md"></div>
                    <span className="text-sm text-gray-700 font-medium">Limited (15-39%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500 shadow-md"></div>
                    <span className="text-sm text-gray-700 font-medium">Full (&lt;15%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Location Details Component (FIXED with Slot Click Modal and Predictive Disclaimers)
const LocationDetails = ({ place }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(0);
  
  // Update timestamp every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  if (!place) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Limited': return 'bg-yellow-500';
      case 'Full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const nextAvailableSlots = place.slots
    .filter(slot => slot.status === 'occupied' && slot.nextAvailable)
    .sort((a, b) => new Date('2024-01-01 ' + a.nextAvailable) - new Date('2024-01-01 ' + b.nextAvailable))
    .slice(0, 6);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const closeModal = () => {
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border-2 border-purple-300">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-black text-gray-800">{place.name}</h1>
                {/* Predictive Status Badge */}
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  🔮 Predictive Status
                </span>
              </div>
              <p className="text-xl text-gray-600 font-semibold">{place.city}, {place.state}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="text-purple-600">{place.icon}</div>
                <p className="text-purple-600 font-bold text-lg">{place.type}</p>
              </div>
              {/* Last Updated Timestamp */}
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 font-medium">
                  Last updated: {lastUpdated} seconds ago
                </span>
              </div>
            </div>
            <span className={`px-8 py-4 text-xl font-black rounded-2xl ${getStatusColor(place.status)} text-white shadow-xl transform hover:scale-110 transition-transform`}>
              {place.status}
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-300 transform hover:scale-105 transition-transform">
              <p className="text-gray-600 text-sm mb-2 font-bold">Total Slots</p>
              <p className="text-5xl font-black text-blue-600">{place.totalSlots}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300 transform hover:scale-105 transition-transform">
              <p className="text-gray-600 text-sm mb-2 font-bold">Available</p>
              <p className="text-5xl font-black text-green-600">{place.availableSlots}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-300 transform hover:scale-105 transition-transform">
              <p className="text-gray-600 text-sm mb-2 font-bold">Occupied</p>
              <p className="text-5xl font-black text-red-600">{place.occupiedSlots}</p>
            </div>
          </div>

          {/* Availability Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-700 mb-2 font-bold">
              <span>Occupancy</span>
              <span>{place.percentage.toFixed(1)}% Available</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full ${getStatusColor(place.status)} transition-all duration-1000`}
                style={{ width: `${place.percentage}%` }}
              />
            </div>
          </div>

          {/* Disclaimer Text */}
          <div className="mt-6 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-black">⚠</span>
              </div>
              <div>
                <p className="text-amber-900 font-bold text-sm mb-1">Important Notice</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Parking availability is <strong>predictive</strong> and may change before arrival due to dynamic vehicle movement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slot-Wise Availability */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-300">
          <h2 className="text-3xl font-black text-gray-800 mb-6">Slot-Wise Availability</h2>
          
          {/* Legend with Click Instruction */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-200">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-bold">Available ({place.availableSlots})</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-600" />
                <span className="text-gray-700 font-bold">Occupied ({place.occupiedSlots})</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl border border-purple-300">
              <p className="text-sm font-bold text-purple-700">💡 Click any slot for details</p>
            </div>
          </div>

          {/* Slot Grid - Now Clickable */}
          <div className="grid grid-cols-12 gap-3 max-h-[600px] overflow-y-auto pr-4">
            {place.slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 transform hover:scale-125 ${
                  slot.status === 'available'
                    ? 'bg-green-100 border-2 border-green-500 text-green-700 hover:bg-green-200 shadow-md hover:shadow-green-500/50'
                    : 'bg-red-100 border-2 border-red-500 text-red-700 hover:bg-red-200 shadow-md hover:shadow-red-500/50'
                }`}
              >
                {slot.id.split('-')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slot Details Modal */}
      {selectedSlot && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-purple-400 transform scale-100 animate-modalAppear"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-black text-gray-800">Slot Details</h3>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-all transform hover:scale-110 hover:rotate-90"
              >
                <XCircle className="w-6 h-6 text-gray-600 hover:text-red-600" />
              </button>
            </div>

            {/* Slot ID */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-4 border-2 border-purple-300">
              <p className="text-xs text-gray-600 font-bold mb-1">Slot Number</p>
              <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {selectedSlot.id}
              </p>
            </div>

            {/* Status */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 font-bold mb-2">Current Status</p>
              <div className={`flex items-center gap-3 p-3 rounded-2xl border-2 ${
                selectedSlot.status === 'available'
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                {selectedSlot.status === 'available' ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-black text-green-700 text-xl">Available</p>
                      <p className="text-sm text-green-600 font-medium">This slot appears to be free</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="font-black text-red-700 text-xl">Occupied</p>
                      <p className="text-sm text-red-600 font-medium">This slot appears to be in use</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Predicted Time - Next Available */}
{selectedSlot.status === 'occupied' && (
  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-300 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
        <Clock className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600 font-bold">Predicted Time</p>
        <p className="text-xs text-gray-500 font-medium">Subject to change</p>
      </div>
    </div>

    <div className="bg-white rounded-xl p-3 border border-orange-200">
      <p className="text-xs text-gray-600 font-bold mb-1">
        Likely to be free at:
      </p>
      <p className="text-xl font-black text-orange-600">
        {selectedSlot?.nextAvailable || place?.estimated_time || "Predicting..."}
      </p>
    </div>
  </div>
)}
            {/* Predictive Disclaimer */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-black">ℹ</span>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed font-medium">
                  This is a <strong>predictive estimate</strong> and actual availability may vary.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full mt-6 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalAppear {
          animation: modalAppear 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Dashboard Component (FIXED)
const AvailabilityDashboard = ({ setSelectedPlace, setCurrentPage, setNavigationHistory, navigationHistory }) => {
  const allPlaces = [];
  Object.keys(parkingData).forEach(state => {
    Object.keys(parkingData[state]).forEach(city => {
      parkingData[state][city].forEach(place => {
        allPlaces.push({ ...place, state, city });
      });
    });
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Limited': return 'bg-yellow-500';
      case 'Full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const viewDetails = async (place) => {
    let updatedPlace = { ...place };
    try {
      const response = await fetch('http://localhost:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location_name: place.name })
      });
      if (response.ok) {
        const data = await response.json();
        updatedPlace = {
          ...updatedPlace,
          availableSlots: data.available_slots,
          occupiedSlots: data.occupied_slots,
          percentage: data.availability_percentage,
          status: data.status,
          estimated_time: data.estimated_time,
          totalSlots: data.total_slots,
          slots: data.slots.map((s, i) => ({
            id: `A${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
            status: s.status,
            nextAvailable: s.nextAvailable
          }))
        };
      }
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
    setSelectedPlace(updatedPlace);
    setCurrentPage('location-details');
    setNavigationHistory([...navigationHistory, 'location-details']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-black text-gray-800">Availability Dashboard</h1>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
              🔮 Predictive Status
            </span>
          </div>
          <p className="text-gray-600 text-lg font-medium mb-3">Parking availability predictions across all locations</p>
          
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 max-w-3xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-black">⚠</span>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                All availability data is <strong>predictive</strong> and may change before arrival due to dynamic vehicle movement.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-7 text-white shadow-2xl transform hover:scale-110 transition-transform">
            <p className="text-sm mb-2 opacity-90 font-bold">Total Locations</p>
            <p className="text-5xl font-black">{allPlaces.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-7 text-white shadow-2xl transform hover:scale-110 transition-transform">
            <p className="text-sm mb-2 opacity-90 font-bold">Available Now</p>
            <p className="text-5xl font-black">
              {allPlaces.filter(p => p.status === 'Available').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-3xl p-7 text-white shadow-2xl transform hover:scale-110 transition-transform">
            <p className="text-sm mb-2 opacity-90 font-bold">Limited</p>
            <p className="text-5xl font-black">
              {allPlaces.filter(p => p.status === 'Limited').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl p-7 text-white shadow-2xl transform hover:scale-110 transition-transform">
            <p className="text-sm mb-2 opacity-90 font-bold">Full</p>
            <p className="text-5xl font-black">
              {allPlaces.filter(p => p.status === 'Full').length}
            </p>
          </div>
        </div>

        {/* Locations Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Location</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">City & State</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Type</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Availability</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Status</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Next Available</th>
                  <th className="px-6 py-5 text-left text-sm font-black uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {allPlaces.map((place) => {
                  const nextSlot = place.slots.find(s => s.status === 'occupied' && s.nextAvailable);
                  return (
                    <tr key={place.id} className="hover:bg-purple-50 transition-all">
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-800">{place.name}</p>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">
                        {place.city}, {place.state}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-4 py-2 bg-purple-100 rounded-xl text-sm text-purple-700 font-bold">
                          {place.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-800 font-black">
                            {place.availableSlots}/{place.totalSlots}
                          </span>
                          <span className="text-purple-600 text-sm font-bold">
                            ({place.percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-32 h-3 bg-gray-200 rounded-full mt-2 overflow-hidden shadow-inner">
                          <div 
                            className={`h-full ${getStatusColor(place.status)}`}
                            style={{ width: `${place.percentage}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-2 rounded-xl text-sm font-black ${getStatusColor(place.status)} text-white shadow-md`}>
                          {place.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {nextSlot ? (
                          <div>
                            <div className="flex items-center gap-2 text-orange-600 text-sm font-bold mb-1">
                              <Clock className="w-4 h-4" />
                              <span>{nextSlot.nextAvailable}</span>
                            </div>
                            <span className="text-xs text-gray-500">Predicted</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm font-medium">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => viewDetails(place)}
                          className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-bold shadow-lg transform hover:scale-110"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pt-24 px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black text-gray-800 mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          About SmartPark
        </h1>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-orange-300">
            <h2 className="text-3xl font-black text-gray-800 mb-4">Purpose</h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              SmartPark is an intelligent parking availability prediction system designed to solve the 
              common problem of finding parking in busy urban areas. By leveraging machine learning 
              and histrorical data analysis, we provide predictions of parking slot availability 
              across major Indian cities, helping drivers save time and reduce stress.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-300">
            <h2 className="text-3xl font-black text-gray-800 mb-4">Slot-Level Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-4 font-medium">
              Unlike traditional parking systems that only show overall capacity, SmartPark provides 
              individual slot-level information. Drivers can see:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium">Exact number and location of available slots</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium">Slot-wise parking availability prediction</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium">Predicted availability times for occupied slots</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium">Historical patterns to plan future visits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-blue-300">
            <h2 className="text-3xl font-black text-gray-800 mb-4">Benefits for Smart Cities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-black text-orange-600 mb-2">Reduced Traffic Congestion</h3>
                <p className="text-gray-700 text-sm font-medium">
                  By directing drivers to available parking immediately, we reduce the time spent 
                  circling for parking, which accounts for 30% of urban traffic.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-green-600 mb-2">Lower Carbon Emissions</h3>
                <p className="text-gray-700 text-sm font-medium">
                  Less time searching for parking means reduced fuel consumption and lower CO2 emissions, 
                  contributing to cleaner, greener cities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-blue-600 mb-2">Improved Urban Planning</h3>
                <p className="text-gray-700 text-sm font-medium">
                  Data-driven insights help city planners optimize parking infrastructure and 
                  understand usage patterns across different areas and times.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-black text-purple-600 mb-2">Enhanced Driver Experience</h3>
                <p className="text-gray-700 text-sm font-medium">
                  Drivers save time, reduce stress, and can plan their trips with confidence knowing 
                  parking availability in advance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-10 text-white shadow-2xl transform hover:scale-105 transition-transform">
            <h2 className="text-3xl font-black mb-4">Coverage & Scale</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">19</div>
                <div className="text-sm opacity-90 font-bold">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">9</div>
                <div className="text-sm opacity-90 font-bold">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">8,340</div>
                <div className="text-sm opacity-90 font-bold">Parking Slots</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">5</div>
                <div className="text-sm opacity-90 font-bold">States</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// How It Works Page
const HowItWorksPage = () => {
  const steps = [
    {
      number: 1,
      title: "Select a Parking Location",
      description: "Browse the map or dashboard to find parking locations near your destination. Use filters to narrow down by state, city, or location type.",
      icon: <MapPin className="w-8 h-8" />,
      gradient: "from-purple-600 to-pink-600"
    },
    {
      number: 2,
      title: "Slot-Level Availability is Evaluated",
      description: "Our ML-powered system predicts parking availability based on historical data, helping users make smarter parking decisions.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      number: 3,
      title: "Results Are Aggregated Per Place",
      description: "Individual slot predictions are combined to show overall location capacity, availability percentage, and comprehensive status.",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-green-600 to-teal-600"
    },
    {
      number: 4,
      title: "Next Available Slots and Times Shown",
      description: "If parking is full or limited, the system predicts when specific slots will become available, helping you plan your visit accordingly.",
      icon: <Clock className="w-8 h-8" />,
      gradient: "from-orange-600 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            AI-powered parking prediction in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="flex gap-8 items-start"
            >
              {/* Step Number Circle */}
              <div className={`flex-shrink-0 w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl text-white transform hover:scale-110 hover:rotate-12 transition-all`}>
                {step.icon}
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-300 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-3xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    Step {step.number}
                  </span>
                  <h3 className="text-2xl font-black text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-2 border-purple-300">
          <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">Technology Behind SmartPark</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">Machine Learning</h3>
              <p className="text-gray-700 font-medium">
                Advanced ML models trained on real parking patterns for accurate predictions
              </p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">Slot-wise Predictions</h3>
              <p className="text-gray-700 font-medium">
                Predicts parking availability across multiple slots using machine learning and historical data patterns.
              </p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🔮</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">Predictive Modeling</h3>
              <p className="text-gray-700 font-medium">
                Time-based forecasting to predict when occupied slots will become available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function SmartParkingApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState(['home']);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setNavigationHistory={setNavigationHistory} navigationHistory={navigationHistory} />;
      case 'map':
        return <MapView setCurrentPage={setCurrentPage} setSelectedPlace={setSelectedPlace} setNavigationHistory={setNavigationHistory} navigationHistory={navigationHistory} />;
      case 'location-details':
        return <LocationDetails place={selectedPlace} />;
      case 'dashboard':
        return <AvailabilityDashboard setSelectedPlace={setSelectedPlace} setCurrentPage={setCurrentPage} setNavigationHistory={setNavigationHistory} navigationHistory={navigationHistory} />;
      case 'about':
        return <AboutPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setNavigationHistory={setNavigationHistory} navigationHistory={navigationHistory} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        navigationHistory={navigationHistory}
        setNavigationHistory={setNavigationHistory}
      />
      {renderPage()}
    </div>
  );
}
