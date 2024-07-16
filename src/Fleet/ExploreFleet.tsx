// src/ExploreFleet.tsx
import React from 'react';
import ExploreFleetCollection from './ExploreFleetCollection';
import { ExploreFleetCollectionProps } from './FleetExploreFleetCollectionProps';
import RedTesla from '../assets/Images/white Ts.jpeg'
import BlueTesla from "../assets/Images/BLUE ON.webp"
import YellowTS from "../assets/Images/download (2).jpeg"



const collections: ExploreFleetCollectionProps[] = [
  {
    image: RedTesla, // replace with actual image paths
    title: 'The freshest EVs',
    description: 'Sample the electric lifestyle',
    manufacturer: 'Tesla',
    model: 'Model S',
    year: 2022,
    fuel_type: 'Electric',
    engine_capacity: 'N/A',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Red',
    features: 'Autopilot, Long Range, Fast Charging',
  },
  {
    image: BlueTesla,
    title: 'Budget-friendly',
    description: 'Affordably priced picks',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: 2021,
    fuel_type: 'Gasoline',
    engine_capacity: '1.8L',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Blue',
    features: 'Economical, Reliable, Comfortable',
  },
  {
    image: RedTesla, // replace with actual image paths
    title: 'The freshest EVs',
    description: 'Sample the electric lifestyle',
    manufacturer: 'Tesla',
    model: 'Model S',
    year: 2022,
    fuel_type: 'Electric',
    engine_capacity: 'N/A',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Red',
    features: 'Autopilot, Long Range, Fast Charging',
  },
  {
    image: YellowTS,
    title: 'Budget-friendly',
    description: 'Affordably priced picks',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: 2021,
    fuel_type: 'Gasoline',
    engine_capacity: '1.8L',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Blue',
    features: 'Economical, Reliable, Comfortable',
  }, 
  {
    image: YellowTS,
    title: 'Budget-friendly',
    description: 'Affordably priced picks',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: 2021,
    fuel_type: 'Gasoline',
    engine_capacity: '1.8L',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Blue',
    features: 'Economical, Reliable, Comfortable',
  },
  {
    image: YellowTS,
    title: 'Budget-friendly',
    description: 'Affordably priced picks',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: 2021,
    fuel_type: 'Gasoline',
    engine_capacity: '1.8L',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Blue',
    features: 'Economical, Reliable, Comfortable',
  },
  {
    image: RedTesla, // replace with actual image paths
    title: 'The freshest EVs',
    description: 'Sample the electric lifestyle',
    manufacturer: 'Tesla',
    model: 'Model S',
    year: 2022,
    fuel_type: 'Electric',
    engine_capacity: 'N/A',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Red',
    features: 'Autopilot, Long Range, Fast Charging',
  },
  {
    image: BlueTesla,
    title: 'Budget-friendly',
    description: 'Affordably priced picks',
    manufacturer: 'Toyota',
    model: 'Corolla',
    year: 2021,
    fuel_type: 'Gasoline',
    engine_capacity: '1.8L',
    transmission: 'Automatic',
    seating_capacity: 5,
    color: 'Blue',
    features: 'Economical, Reliable, Comfortable',
  },

  // Add other collections similarly...
];

const ExploreFleet: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">Explore Collections</h2>
        <p className="mt-2 text-gray-600">Rent the perfect car to match your vibe</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <ExploreFleetCollection
              key={index}
              {...collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreFleet;
