
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileViewProps {
  user: {
    name: string;
    imageUrl: string;
    bio: string;
    favorites: number;
    reviews: number;
  };
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 animate-fade-in rtl">
      <div className="relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow-sm z-10"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
            <img 
              src={user.imageUrl} 
              alt={user.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className="text-xl font-bold mb-1">{user.name}</h1>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <p className="text-sm text-gray-500">חופים מועדפים</p>
              <p className="font-bold text-lg">{user.favorites}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">ביקורות</p>
              <p className="font-bold text-lg">{user.reviews}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">אודות</h2>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">החופים המועדפים עליי</h2>
          <div className="flex overflow-x-auto space-x-3 rtl:space-x-reverse pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[140px] rounded-lg overflow-hidden shadow-sm">
                <div className="h-20 bg-gray-200"></div>
                <div className="p-2">
                  <p className="text-sm font-medium">חוף בוגרשוב</p>
                  <p className="text-xs text-gray-500">תל אביב - יפו</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">הביקורות שלי</h2>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="p-3 border rounded-lg">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">חוף הכרמל</p>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">חוף נקי ונעים, מומלץ מאוד למשפחות!</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
