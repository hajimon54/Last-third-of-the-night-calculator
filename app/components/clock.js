"use client";
import React from "react";
import Axios from "axios";

function Clock() {
  // Define the calculateLastThirdOfNight function outside of the return
  const calculateLastThirdOfNight = (maghribTime, fajrTime) => {
    const maghrib = new Date();
    maghrib.setHours(parseInt(maghribTime.split(":")[0]));
    maghrib.setMinutes(parseInt(maghribTime.split(":")[1]));
    maghrib.setSeconds(0);

    const fajr = new Date();
    fajr.setHours(parseInt(fajrTime.split(":")[0]));
    fajr.setMinutes(parseInt(fajrTime.split(":")[1]));
    fajr.setSeconds(0);

    // Adjust for next day if Fajr is earlier in the day than Maghrib
    if (fajr < maghrib) {
      fajr.setDate(fajr.getDate() + 1);
    }

    const nightDuration = fajr - maghrib;
    const lastThirdStart = new Date(
      maghrib.getTime() + (nightDuration * 2) / 3
    );
    const hours = lastThirdStart.getHours().toString().padStart(2, "0");
    const minutes = lastThirdStart.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // Calculate last third of the night time
  const lastThirdStart = calculateLastThirdOfNight("18:45", "04:30");

  // Render the calculated time
  return (
    <div>
      <p>{lastThirdStart}</p>
    </div>
  );
}

export default Clock;
