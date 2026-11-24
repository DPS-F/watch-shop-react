import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop';

  return (
    <div className="card">
      <img 
        className="card__image"
        src={product.thumbnail} 
        alt={product.title} 
        onError={(e) => { e.currentTarget.src = fallbackImage; }} 
      />
      <h3 className="card__title">{product.title}</h3>
      <p className="card__description">{product.description.substring(0, 60)}...</p>
      <div className="card__footer">
        <p className="card__price">${product.price}</p>
        <p className="card__rating">⭐ {product.rating}</p>
      </div>
    </div>
  );
};