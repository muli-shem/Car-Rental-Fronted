// src/Fleet/ExploreFleetCollection.tsx
import React from 'react';
import { ExploreFleetCollectionProps } from './FleetExploreFleetCollectionProps';
import {Link} from 'react-router-dom';
const ExploreFleetCollection: React.FC<ExploreFleetCollectionProps> = ({
  image,
  title,
  description,
  manufacturer,
  model,
  year,
  fuel_type,
  engine_capacity,
  transmission,
  seating_capacity,
  color,
  features
}) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <ul className="mt-2 text-sm text-gray-700">
          <li><strong>Manufacturer:</strong> {manufacturer}</li>
          <li><strong>Model:</strong> {model}</li>
          <li><strong>Year:</strong> {year}</li>
          <li><strong>Fuel Type:</strong> {fuel_type}</li>
          <li><strong>Engine Capacity:</strong> {engine_capacity}</li>
          <li><strong>Transmission:</strong> {transmission}</li>
          <li><strong>Seating Capacity:</strong> {seating_capacity}</li>
          <li><strong>Color:</strong> {color}</li>
          <li><strong>Features:</strong> {features}</li>
        </ul>
        <Link className="btn btn-ghost normal-case mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" to ="/register">BOOK</Link>
      </div>
    </div>
  );
}

export default ExploreFleetCollection;
