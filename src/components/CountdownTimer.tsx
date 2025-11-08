"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set launch date to November 15, 2025
    const launchDate = new Date('2025-11-15T00:00:00');

    const calculateTimeLeft = () => {
      const difference = +launchDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex gap-4 justify-center flex-wrap"
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div
            className="bg-white border-2 rounded-2xl shadow-lg px-6 py-4 min-w-[100px] sm:min-w-[120px]"
            style={{ borderColor: '#2563EB20' }}
          >
            <div
              className="tabular-nums"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: '#2563EB',
                lineHeight: 1,
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
          </div>
          <span
            className="mt-2 text-gray-600"
            style={{ fontSize: '0.875rem', fontWeight: 500 }}
          >
            {unit.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
