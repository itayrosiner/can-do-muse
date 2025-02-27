
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedFilters: Record<string, string[]>) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState('facilities');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const categories: FilterCategory[] = [
    {
      id: 'facilities',
      label: 'מתקנים',
      options: [
        { id: 'accessibility', label: 'נגישות לנכים', icon: <span className="text-xl">♿</span> },
        { id: 'lifeguard', label: 'הצלה', icon: <span className="text-xl">🛟</span> },
        { id: 'shade', label: 'צל', icon: <span className="text-xl">🏝️</span> },
        { id: 'parking', label: 'חניון', icon: <span className="text-xl">🅿️</span> }
      ]
    },
    {
      id: 'amenities',
      label: 'שירותים',
      options: [
        { id: 'changing_rooms', label: 'תאי הלבשה', icon: <span className="text-xl">👙</span> },
        { id: 'food', label: 'מזון', icon: <span className="text-xl">🍽️</span> },
        { id: 'cleanliness', label: 'ניקיון', icon: <span className="text-xl">✨</span> },
        { id: 'restrooms', label: 'שירותים', icon: <span className="text-xl">🚻</span> }
      ]
    },
    {
      id: 'activities',
      label: 'פעילויות',
      options: [
        { id: 'surfing', label: 'גלישה', icon: <span className="text-xl">🏄‍♂️</span> },
        { id: 'swimming', label: 'שחייה', icon: <span className="text-xl">🏊‍♂️</span> },
        { id: 'volleyball', label: 'כדורעף', icon: <span className="text-xl">🏐</span> },
        { id: 'pets', label: 'חיות מחמד', icon: <span className="text-xl">🐕</span> }
      ]
    }
  ];

  const toggleFilter = (categoryId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[categoryId]) {
        newFilters[categoryId] = [];
      }
      
      if (newFilters[categoryId].includes(optionId)) {
        newFilters[categoryId] = newFilters[categoryId].filter(id => id !== optionId);
      } else {
        newFilters[categoryId] = [...newFilters[categoryId], optionId];
      }
      
      return newFilters;
    });
  };

  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  if (!isOpen) return null;

  const activeCategory = categories.find(cat => cat.id === activeTab);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl animate-slide-in rtl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">סינון</h2>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>
        
        <div className="nav-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`nav-tab ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 max-h-80 overflow-y-auto">
          {activeCategory?.options.map(option => {
            const isSelected = selectedFilters[activeCategory.id]?.includes(option.id);
            
            return (
              <div 
                key={option.id}
                className={`filter-option ${isSelected ? 'bg-sea-light' : ''}`}
                onClick={() => toggleFilter(activeCategory.id, option.id)}
              >
                <div className="filter-icon">{option.icon}</div>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 border-t">
          <button onClick={handleApply} className="btn-primary">
            החל
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
