// CampgroundLocationsChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  review: string;
  reviews: string[];
  date: string;
  imageUrl: string;
  booking: string[];
}

interface Props {
  campgrounds: Campground[];
}

const CampgroundLocationsChart: React.FC<Props> = ({ campgrounds }) => {
  const calculateLocationsData = (): { location: string; count: number }[] => {
    const locationsData: Record<string, number> = {};

    campgrounds.forEach((campground) => {
      const location = campground.location;
      locationsData[location] = (locationsData[location] || 0) + 1;
    });

    return Object.keys(locationsData).map((location) => ({
      location,
      count: locationsData[location],
    }));
  };

  const locationsData = calculateLocationsData();

  return (
    <BarChart
      width={800}
      height={500}
      data={locationsData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="location" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default CampgroundLocationsChart;