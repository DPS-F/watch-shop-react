import React from 'react';
import { Button } from './Button';

interface SearchProps {
  query: string;
  setQuery: (q: string) => void;
  category: string;
  setCategory: (c: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const Search: React.FC<SearchProps> = ({ 
  query, setQuery, category, setCategory, onSearch, isLoading 
}) => {
  return (
    <div className="search">
      <input 
        className="search__input"
        type="text" 
        placeholder="Поиск модели..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      
      <select 
        className="search__select"
        value={category} 
        onChange={(e) => {
          setQuery("");
          setCategory(e.target.value);
        }}
      >
        <option value="all-watches">Все часы</option>
        <option value="mens-watches">Мужские часы</option>
        <option value="womens-watches">Женские часы</option>
        <option value="sunglasses">Очки</option>
        <option value="womens-jewellery">Украшения</option>
      </select>

      <Button 
        text="Найти" 
        variant="primary" 
        onClick={onSearch} 
        isLoading={isLoading} 
      />
    </div>
  );
};