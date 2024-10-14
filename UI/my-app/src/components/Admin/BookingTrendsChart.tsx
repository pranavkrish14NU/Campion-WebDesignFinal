import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const BookingTrendsChart: React.FC<Props> = ({ campgrounds }) => {
  const calculateBookingTrendsData = (): { date: string; bookings: number }[] => {
    const bookingTrendsData: Record<string, number> = {};

    campgrounds.forEach((campground) => {
      const date = campground.date;
      bookingTrendsData[date] = (bookingTrendsData[date] || 0) + 1;
    });

    return Object.keys(bookingTrendsData).map((date) => ({
      date,
      bookings: bookingTrendsData[date],
    }));
  };

  const bookingTrendsData = calculateBookingTrendsData();

  return (
    <LineChart
      width={300}
      height={200}
      data={bookingTrendsData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
    </LineChart>
  );
};

export default BookingTrendsChart;
