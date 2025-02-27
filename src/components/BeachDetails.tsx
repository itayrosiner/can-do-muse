
import React from 'react';
import { MapPin, ArrowLeft, Wheelchair, Car, Road, CloudSun, MapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Beach } from '@/types/beach';

interface BeachDetailsProps {
  beach: {
    id: string;
    beach_name: string;
    city: string;
    Shadow: "Full" | "Partial" | "None";
    accessibility_parking: boolean;
    Access_road_to_beach: boolean;
    Distance_parking_to_beach: number;
    beach_accessible_chairs: number;
    israel_region: "North" | "Center" | "South";
    wheelchair_accessible: boolean;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

const BeachDetails: React.FC<BeachDetailsProps> = ({ beach }) => {
  const navigate = useNavigate();

  // Get the appropriate emoji for shadow level
  const getShadowEmoji = (shadow: string) => {
    switch (shadow) {
      case "Full": return "☂️";
      case "Partial": return "🌤️";
      case "None": return "☀️";
      default: return "🏖️";
    }
  };

  return (
    <div className="pb-20 animate-fade-in">
      <div className="relative h-56">
        <img 
          src={`https://source.unsplash.com/featured/?beach,${beach.beach_name.replace(' ', '')}`} 
          alt={beach.beach_name} 
          className="w-full h-full object-cover" 
        />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="p-4 rtl">
        <h1 className="text-2xl font-bold">{beach.beach_name}</h1>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={16} className="ml-1" />
          <span className="text-sm">{beach.city}</span>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          חוף {beach.beach_name} נמצא באזור {beach.israel_region} של ישראל. 
          {beach.wheelchair_accessible ? ' החוף נגיש לכיסאות גלגלים.' : ' החוף אינו נגיש לכיסאות גלגלים.'}
          {beach.accessibility_parking ? ' קיימת חניית נכים.' : ' אין חניית נכים.'}
          {beach.Access_road_to_beach ? ' קיימת דרך גישה לחוף.' : ' אין דרך גישה מסודרת לחוף.'}
        </p>
        
        <h2 className="text-lg font-semibold mb-2">פרטי נגישות</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center ml-2">
              <Wheelchair size={18} />
            </div>
            <span className="text-sm">
              {beach.wheelchair_accessible ? 'נגיש לכיסאות גלגלים' : 'לא נגיש לכיסאות גלגלים'}
            </span>
          </div>
          
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center ml-2">
              <Car size={18} />
            </div>
            <span className="text-sm">
              {beach.accessibility_parking ? 'חניית נכים' : 'אין חניית נכים'}
            </span>
          </div>
          
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center ml-2">
              <Road size={18} />
            </div>
            <span className="text-sm">
              {beach.Access_road_to_beach ? 'דרך גישה לחוף' : 'אין דרך גישה מסודרת'}
            </span>
          </div>
          
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center ml-2">
              <CloudSun size={18} />
            </div>
            <span className="text-sm">
              צל: {beach.Shadow} {getShadowEmoji(beach.Shadow)}
            </span>
          </div>
          
          <div className="flex items-center p-2 bg-gray-50 rounded-lg col-span-2">
            <div className="w-8 h-8 bg-sea-light rounded-full flex items-center justify-center ml-2">
              <span className="text-sm font-bold">🦽</span>
            </div>
            <span className="text-sm">
              {beach.beach_accessible_chairs} כסאות נגישים זמינים
            </span>
          </div>
        </div>
        
        <div className="bg-sea-light rounded-xl p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <MapIcon size={18} className="ml-2" />
            מפת התמצאות
          </h2>
          <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center relative">
            <div className="text-center">
              <p>מיקום החוף:</p>
              <p className="text-sm text-gray-600 mt-1">
                {beach.location.latitude.toFixed(4)}, {beach.location.longitude.toFixed(4)}
              </p>
            </div>
          </div>
          <p className="text-xs text-center mt-2 text-gray-500">
            מרחק מחניה לחוף: {beach.Distance_parking_to_beach} מטרים
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeachDetails;
