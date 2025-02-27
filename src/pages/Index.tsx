
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BeachCard from '@/components/BeachCard';
import FilterPopup from '@/components/FilterPopup';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
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

// Assign IDs to beaches
const beachesWithId = beachesData.map((beach, index) => ({
  ...beach,
  id: (index + 1).toString()
}));

const HomePage: React.FC = () => {
  const [beaches, setBeaches] = useState(beachesWithId);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setBeaches(beachesWithId);
      return;
    }

    const filtered = beachesWithId.filter(
      beach => beach.beach_name.includes(query) || beach.city.includes(query)
    );
    
    setBeaches(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "לא נמצאו תוצאות",
        description: "נסה לחפש שוב עם מילות מפתח אחרות",
      });
    }
  };

  const handleFilterApply = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    
    // Filter beaches based on selected options
    let filteredBeaches = [...beachesWithId];
    
    // Apply accessibility filters
    if (filters.accessibility && filters.accessibility.length > 0) {
      if (filters.accessibility.includes('wheelchair')) {
        filteredBeaches = filteredBeaches.filter(beach => beach.wheelchair_accessible);
      }
      
      if (filters.accessibility.includes('parking')) {
        filteredBeaches = filteredBeaches.filter(beach => beach.accessibility_parking);
      }
      
      if (filters.accessibility.includes('road')) {
        filteredBeaches = filteredBeaches.filter(beach => beach.Access_road_to_beach);
      }
    }
    
    // Apply region filters
    if (filters.region && filters.region.length > 0) {
      filteredBeaches = filteredBeaches.filter(beach => 
        filters.region.includes(beach.israel_region.toLowerCase())
      );
    }
    
    // Apply shadow filters
    if (filters.shadow && filters.shadow.length > 0) {
      filteredBeaches = filteredBeaches.filter(beach => 
        filters.shadow.includes(beach.Shadow.toLowerCase())
      );
    }
    
    setBeaches(filteredBeaches);
    
    const hasFilters = Object.values(filters).some(arr => arr.length > 0);
    
    if (hasFilters) {
      toast({
        title: "הפילטרים הוחלו בהצלחה",
        description: "מציג חופים מסוננים",
      });
    } else {
      setBeaches(beachesWithId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SearchBar 
        onSearch={handleSearch} 
        onFilter={() => setIsFilterOpen(true)} 
      />
      
      <main className="main-container">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="beach-card">
                <div className="h-40 bg-gray-200" />
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4">
              {beaches.map(beach => (
                <BeachCard
                  key={beach.id}
                  id={beach.id}
                  name={beach.beach_name}
                  location={beach.city}
                  imageUrl={`https://source.unsplash.com/featured/?beach,${beach.beach_name.replace(' ', '')}`}
                />
              ))}
            </div>
            
            {beaches.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">לא נמצאו חופים התואמים את החיפוש שלך</p>
              </div>
            )}
          </>
        )}
      </main>
      
      <FilterPopup 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={handleFilterApply}
      />

      {/* Floating action button for profile */}
      <Link 
        to="/profile" 
        className="fixed bottom-6 right-6 w-14 h-14 bg-sea-blue rounded-full flex items-center justify-center shadow-lg animate-scale-in"
      >
        <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
