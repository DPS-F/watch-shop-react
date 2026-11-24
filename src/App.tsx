import { useState, useEffect } from 'react';
import { Search } from './components/Search';
import { ProductCard } from './components/ProductCard';
import { Button } from './components/Button';
import type { Product } from './types';

const API_URL = "https://dummyjson.com/products";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all-watches");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        let url = "";
        if (query) {
          url = `${API_URL}/search?q=${query}`;
        } else if (category === "all-watches") {
          url = `${API_URL}/search?q=watch`;
        } else {
          url = `${API_URL}/category/${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query, category, searchTrigger]); 

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const handleSearch = () => {
    setSearchTrigger(prev => prev + 1); 
  };

  return (
    <div className="catalog">
      <header className="catalog__header">
        <h1 className="catalog__title">23:59</h1>
        <p className="catalog__subtitle">Искусство точного времени</p>
        <button 
          className="theme-btn" 
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          {isDarkTheme ? "☀️ Светлая тема" : "🌙 Темная тема"}
        </button>
      </header>

      <main>
        <Search 
          query={query} 
          setQuery={setQuery} 
          category={category} 
          setCategory={setCategory} 
          onSearch={handleSearch}
          isLoading={loading}
        />

        {loading && <div className="status">Загрузка каталога...</div>}
        
        {error && (
          <div className="status">
            Ошибка загрузки. 
            <Button 
              text="Повторить" 
              variant="secondary" 
              onClick={handleSearch} 
            />
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="status">Ничего не найдено 😔</div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}