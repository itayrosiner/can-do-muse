
import React from 'react';
import { Link } from 'react-router-dom';

interface BeachCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

const BeachCard: React.FC<BeachCardProps> = ({ id, name, location, imageUrl }) => {
  return (
    <Link to={`/beach/${id}`} className="block">
      <div className="beach-card card-hover animate-fade-in">
        <img src={imageUrl} alt={name} className="beach-card-image" />
        <div className="beach-card-content rtl">
          <h3 className="beach-card-title">{name}</h3>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default BeachCard;
