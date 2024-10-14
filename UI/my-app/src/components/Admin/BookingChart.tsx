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
  author: {
    _id: string;
    username: string;
  };
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
      width={600}
      height={300}
      data={bookingTrendsData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {campgrounds.map((campground) => (
        <Line
          key={campground._id}
          type="monotone"
          dataKey={campground.author.username}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each author
        />
      ))}
    </LineChart>
  );
};

export default BookingTrendsChart;
