"use client";
import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";

const PrayerTimesFetcher = () => {
  const [fajrTime, setFajrTime] = useState(null);
  const [maghribTime, setMaghribTime] = useState(null);
  const [resultTime, setResultTime] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const nextDay = addDays(today, 1);

        const year = format(today, "yyyy");
        const month = format(today, "MM");
        const day = format(today, "dd");
        const nextDayFormatted = format(nextDay, "dd");

        const response = await fetch(
          `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.55395892142127&longitude=0.11363820917832658&method=2`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const todayPrayerTimes = data.data[parseInt(day) - 1].timings;
        const nextDayPrayerTimes =
          data.data[parseInt(nextDayFormatted) - 1].timings;

        const fajr = nextDayPrayerTimes.Fajr.replace(/ \(BST\)/g, "");
        const maghrib = todayPrayerTimes.Maghrib.replace(/ \(BST\)/g, "");

        // Remove the letters 'BST' and surrounding spaces/parentheses from the time strings
        // maghrib = maghrib.replace(/ \(BST\)/g, "");
        // fajr = fajr

        setFajrTime(fajr);
        setMaghribTime(maghrib);

        // Calculate the result time
        const result = calculateResultTime(fajr, maghrib);
        setResultTime(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchPrayerTimes();
  }, []);

  const calculateResultTime = (fajr, maghrib) => {
    // Convert time string (HH:mm) to minutes since midnight
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        console.error("Invalid time format:", time); // Debugging
        return 0; // Return 0 if the time format is invalid
      }
      return hours * 60 + minutes;
    };

    const minutesToTime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
        2,
        "0"
      )}`;
    };

    const fajrMinutes = timeToMinutes(fajr);
    const maghribMinutes = timeToMinutes(maghrib);

    const sumMinutes = Math.abs(fajrMinutes - maghribMinutes / 3);
    const resultMinutes = Math.floor(sumMinutes);

    return minutesToTime(resultMinutes);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Fajr time for tomorrow: {fajrTime}</p>
      <p>Maghrib time for the current today: {maghribTime}</p>
      {resultTime && <p>Resulting time: {resultTime}</p>}
    </div>
  );
};

export default PrayerTimesFetcher;
