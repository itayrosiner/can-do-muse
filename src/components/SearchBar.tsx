
import React from 'react';
import { Search, Sliders } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilter, 
  placeholder = "חפש חוף..." 
}) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="flex flex-1 items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input rtl"
          dir="rtl"
        />
        <button type="submit" className="filter-button -ml-10 z-10">
          <Search size={18} />
        </button>
      </form>
      <button onClick={onFilter} className="filter-button">
        <Sliders size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
