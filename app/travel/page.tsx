import React from 'react';
import TravelPageClient from '@/components/TravelPageClient';
import { getAllTravels } from '@/lib/travels';

export default async function TravelPage() {
  const travels = getAllTravels();
  
  const travelData = travels.map((travel, index) => ({
    id: index + 1,
    title: travel.metadata.title,
    location: travel.metadata.location,
    coord: travel.metadata.coord,
    date: travel.metadata.date,
    year: travel.metadata.year,
    days: travel.metadata.days,
    cost: travel.metadata.cost,
    image: travel.metadata.image,
    slug: travel.slug,
    transport: travel.metadata.transport
  }));

  return <TravelPageClient travels={travelData} />;
}
