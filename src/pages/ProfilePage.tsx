
import React, { useState, useEffect } from 'react';
import ProfileView from '@/components/ProfileView';

// Sample user data - in a real app this would come from an API or auth state
const userData = {
  name: 'דניאל כהן',
  imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  bio: 'אוהב חופים, שחייה וגלישה. מבלה את רוב הזמן הפנוי שלי בחוף, תמיד מחפש את החוף המושלם לגלישה או סתם לרביצה בשמש.',
  favorites: 12,
  reviews: 8,
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUser(userData);
      setIsLoading(false);
    }, 800);
  }, []);

  if (isLoading) {
    return (
      <div className="pb-20 animate-pulse">
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 mb-3" />
          <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="h-3 bg-gray-100 rounded w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-8 mx-auto" />
            </div>
            <div className="text-center">
              <div className="h-3 bg-gray-100 rounded w-16 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-8 mx-auto" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="h-5 bg-gray-200 rounded w-20 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">משתמש לא נמצא</h1>
          <p className="text-gray-500 mb-4">אולי כדאי להתחבר שוב</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="px-4 py-2 bg-sea-blue text-white rounded-lg"
          >
            התחברות
          </button>
        </div>
      </div>
    );
  }

  return <ProfileView user={user} />;
};

export default ProfilePage;
