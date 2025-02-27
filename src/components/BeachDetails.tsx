
import React from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BeachDetailsProps {
  beach: {
    id: string;
    name: string;
    location: string;
    description: string;
    imageUrl: string;
    facilities: string[];
  };
}

const BeachDetails: React.FC<BeachDetailsProps> = ({ beach }) => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 animate-fade-in">
      <div className="relative h-56">
        <img src={beach.imageUrl} alt={beach.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="p-4 rtl">
        <h1 className="text-2xl font-bold">{beach.name}</h1>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={16} className="ml-1" />
          <span className="text-sm">{beach.location}</span>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">{beach.description}</p>
        
        <h2 className="text-lg font-semibold mb-2">מתקנים בחוף</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {beach.facilities.map((facility, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center mr-2">
                <span>🏖️</span>
              </div>
              <span className="text-sm">{facility}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-sea-light rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">מפת התמצאות</h2>
          <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
            מפה תוצג כאן
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachDetails;
