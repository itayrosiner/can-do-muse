
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BeachCard from '@/components/BeachCard';
import FilterPopup from '@/components/FilterPopup';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

// Sample data - in a real app this would come from an API
const beachesData = [
  {
    id: '1',
    name: 'חוף בוגרשוב',
    location: 'תל אביב - יפו',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'חוף גורדון',
    location: 'תל אביב - יפו',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    name: 'חוף הכרמל',
    location: 'חיפה',
    imageUrl: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '4',
    name: 'חוף אכזיב',
    location: 'נהריה',
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '5',
    name: 'חוף פלמחים',
    location: 'רחובות',
    imageUrl: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80&w=1000',
  },
];

const HomePage: React.FC = () => {
  const [beaches, setBeaches] = useState(beachesData);
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
      setBeaches(beachesData);
      return;
    }

    const filtered = beachesData.filter(
      beach => beach.name.includes(query) || beach.location.includes(query)
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
    
    // In a real app, you would filter based on the selected options
    // For demo purposes, we'll just show a toast
    const hasFilters = Object.values(filters).some(arr => arr.length > 0);
    
    if (hasFilters) {
      toast({
        title: "הפילטרים הוחלו בהצלחה",
        description: "מציג חופים מסוננים",
      });
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
                  name={beach.name}
                  location={beach.location}
                  imageUrl={beach.imageUrl}
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
