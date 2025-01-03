"use client"
import React, { createContext, useState, ReactNode, useContext } from "react";

interface TimeState {
  time: string | null;
  setTime: (time: string | null) => void;
}

const TimeContext = createContext<TimeState | undefined>(undefined);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState<string | null>(null);
  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be used within a TimeProvider");
  }
  return context;
};
