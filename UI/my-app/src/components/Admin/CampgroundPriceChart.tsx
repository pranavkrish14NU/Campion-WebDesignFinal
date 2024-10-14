import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Campground {
  _id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  price: number;
  review: string;
  reviews:string[];
  date: string;
  imageUrl: string;
  booking:string[];
}
interface BookingData {
  startDate: string;
  endDate: string;
}

interface Props {
  campgrounds: Campground[];
}

const CampgroundPriceChart: React.FC<Props> = ({ campgrounds }) => {
  // Calculate average prices based on campground types
  const avgPricesByType: { [key: string]: number } = {};

  campgrounds.forEach((campground) => {
    if (avgPricesByType[campground.type]) {
      avgPricesByType[campground.type] += campground.price;
    } else {
      avgPricesByType[campground.type] = campground.price;
    }
  });

  Object.keys(avgPricesByType).forEach((type) => {
    avgPricesByType[type] /= campgrounds.filter((c) => c.type === type).length;
  });

  // Convert data to an array for Recharts
  const chartData = Object.keys(avgPricesByType).map((type) => ({
    type,
    avgPrice: avgPricesByType[type],
  }));

  return (
    <BarChart width={300} height={200} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="avgPrice" fill="#8884d8" />
    </BarChart>
  );
};

export default CampgroundPriceChart;