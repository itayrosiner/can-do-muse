
import React from 'react';
import { Link } from 'react-router-dom';
import { Wheelchair, Car, SunSnow, MapPin } from 'lucide-react';

interface BeachCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

const BeachCard: React.FC<BeachCardProps> = ({ id, name, location, imageUrl }) => {
  // For real implementation, we would fetch this data
  const beach = beachesWithId.find(b => b.id === id);
  
  return (
    <Link to={`/beach/${id}`} className="block">
      <div className="beach-card card-hover animate-fade-in">
        <div className="relative">
          <img src={imageUrl} alt={name} className="beach-card-image" />
          
          {/* Accessibility indicators */}
          {beach && (
            <div className="absolute bottom-2 left-2 flex space-x-2">
              {beach.wheelchair_accessible && (
                <div className="bg-white/80 p-1 rounded-full" title="נגיש לכיסאות גלגלים">
                  <Wheelchair size={16} className="text-sea-blue" />
                </div>
              )}
              
              {beach.accessibility_parking && (
                <div className="bg-white/80 p-1 rounded-full" title="חניית נכים">
                  <Car size={16} className="text-sea-blue" />
                </div>
              )}
              
              {beach.Shadow !== "None" && (
                <div className="bg-white/80 p-1 rounded-full" title={`צל: ${beach.Shadow}`}>
                  <SunSnow size={16} className="text-sea-blue" />
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="beach-card-content rtl">
          <h3 className="beach-card-title">{name}</h3>
          <p className="text-xs text-gray-500 flex items-center">
            <MapPin size={12} className="ml-1" />
            {location}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Import the beach data with IDs
// This avoids prop drilling for all the beach details
const beachesData = [
  {
    "beach_name": "Gordon Beach",
    "city": "Tel Aviv",
    "Shadow": "Full",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "Center",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0806, "longitude": 34.7725 }
  },
  // ... all other beaches as in the Index.tsx file
];

// Add IDs to the beaches for lookup
const beachesWithId = beachesData.map((beach, index) => ({
  ...beach,
  id: (index + 1).toString()
}));

export default BeachCard;
