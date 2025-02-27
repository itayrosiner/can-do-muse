
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BeachDetails from '@/components/BeachDetails';
import { Beach } from '@/types/beach';

// Sample data - from the user's provided database
const beachesData: Beach[] = [
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
  {
    "beach_name": "Frishman Beach",
    "city": "Tel Aviv",
    "Shadow": "Partial",
    "accessibility_parking": false,
    "Access_road_to_beach": false,
    "Distance_parking_to_beach": 200,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0800, "longitude": 34.7700 }
  },
  {
    "beach_name": "Hilton Beach",
    "city": "Tel Aviv",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 150,
    "beach_accessible_chairs": 3,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0760, "longitude": 34.7770 }
  },
  {
    "beach_name": "Banana Beach",
    "city": "Tel Aviv",
    "Shadow": "Full",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "Center",
    "wheelchair_accessible": false,
    "location": { "latitude": 32.0768, "longitude": 34.7799 }
  },
  {
    "beach_name": "Metzitzim Beach",
    "city": "Tel Aviv",
    "Shadow": "Partial",
    "accessibility_parking": true,
    "Access_road_to_beach": false,
    "Distance_parking_to_beach": 300,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": false,
    "location": { "latitude": 32.0782, "longitude": 34.7733 }
  },
  {
    "beach_name": "Alma Beach",
    "city": "Tel Aviv",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0750, "longitude": 34.7760 }
  },
  {
    "beach_name": "Herzliya Beach",
    "city": "Herzliya",
    "Shadow": "Full",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "Center",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.1650, "longitude": 34.8320 }
  },
  {
    "beach_name": "Tel Baruch Beach",
    "city": "Tel Aviv",
    "Shadow": "Partial",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 200,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0920, "longitude": 34.7870 }
  },
  {
    "beach_name": "Jaffa Beach",
    "city": "Tel Aviv-Yafo",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 150,
    "beach_accessible_chairs": 3,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0540, "longitude": 34.7500 }
  },
  {
    "beach_name": "Hof HaCarmel Beach",
    "city": "Haifa",
    "Shadow": "Full",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "Center",
    "wheelchair_accessible": false,
    "location": { "latitude": 32.8222, "longitude": 34.9899 }
  },
  {
    "beach_name": "Bat Galim Beach",
    "city": "Haifa",
    "Shadow": "Partial",
    "accessibility_parking": true,
    "Access_road_to_beach": false,
    "Distance_parking_to_beach": 300,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.8150, "longitude": 34.9870 }
  },
  {
    "beach_name": "Coral Beach",
    "city": "Eilat",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 29.5581, "longitude": 34.9482 }
  },
  {
    "beach_name": "Dolphin Reef Beach",
    "city": "Eilat",
    "Shadow": "Full",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 200,
    "beach_accessible_chairs": 1,
    "israel_region": "Center",
    "wheelchair_accessible": false,
    "location": { "latitude": 29.5450, "longitude": 34.9480 }
  },
  {
    "beach_name": "Red Sea Beach",
    "city": "Eilat",
    "Shadow": "Partial",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 150,
    "beach_accessible_chairs": 3,
    "israel_region": "North",
    "wheelchair_accessible": true,
    "location": { "latitude": 29.5500, "longitude": 34.9510 }
  },
  {
    "beach_name": "Ashkelon Beach",
    "city": "Ashkelon",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 31.6700, "longitude": 34.5750 }
  },
  {
    "beach_name": "Ashdod Beach",
    "city": "Ashdod",
    "Shadow": "Full",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 200,
    "beach_accessible_chairs": 1,
    "israel_region": "Center",
    "wheelchair_accessible": true,
    "location": { "latitude": 31.8000, "longitude": 34.6500 }
  },
  {
    "beach_name": "Caesarea Beach",
    "city": "Caesarea",
    "Shadow": "Partial",
    "accessibility_parking": true,
    "Access_road_to_beach": false,
    "Distance_parking_to_beach": 300,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": false,
    "location": { "latitude": 32.5000, "longitude": 34.9000 }
  },
  {
    "beach_name": "Netanya Beach",
    "city": "Netanya",
    "Shadow": "None",
    "accessibility_parking": true,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 100,
    "beach_accessible_chairs": 2,
    "israel_region": "South",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.3300, "longitude": 34.8500 }
  },
  {
    "beach_name": "Rishon LeZion Beach",
    "city": "Rishon LeZion",
    "Shadow": "Full",
    "accessibility_parking": false,
    "Access_road_to_beach": true,
    "Distance_parking_to_beach": 200,
    "beach_accessible_chairs": 1,
    "israel_region": "Center",
    "wheelchair_accessible": true,
    "location": { "latitude": 32.0560, "longitude": 34.7720 }
  },
  {
    "beach_name": "Herzliya Marina Beach",
    "city": "Herzliya",
    "Shadow": "Partial",
    "accessibility_parking": true,
    "Access_road_to_beach": false,
    "Distance_parking_to_beach": 300,
    "beach_accessible_chairs": 1,
    "israel_region": "North",
    "wheelchair_accessible": false,
    "location": { "latitude": 32.1655, "longitude": 34.8350 }
  }
];

// Assign IDs to beaches for lookup
const beachesWithId = beachesData.map((beach, index) => ({
  ...beach,
  id: (index + 1).toString()
}));

const BeachDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [beach, setBeach] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundBeach = beachesWithId.find(b => b.id === id);
        if (foundBeach) {
          setBeach(foundBeach);
        }
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-56 bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded-md w-1/3 mb-6" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded-md w-full" />
            <div className="h-3 bg-gray-100 rounded-md w-full" />
            <div className="h-3 bg-gray-100 rounded-md w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!beach) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">החוף לא נמצא</h1>
          <p className="text-gray-500 mb-4">אנחנו לא מצליחים למצוא את החוף שחיפשת</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-sea-blue text-white rounded-lg"
          >
            חזרה
          </button>
        </div>
      </div>
    );
  }

  return <BeachDetails beach={beach} />;
};

export default BeachDetailPage;
