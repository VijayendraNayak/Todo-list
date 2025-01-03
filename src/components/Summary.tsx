"use client"
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

type Props = {
  togglesummary: () => void;
};

interface Reservation {
  name: string;
  phone: string;
  guest: number;
  date: string;
  time: string;
}

const Summary = ({ togglesummary }: Props) => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMostRecentReservation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/get");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming reservations are sorted by most recent
        if (data.reservations && data.reservations.length > 0) {
          setReservation(data.reservations[data.reservations.length - 1]);
        } else {
          toast.error("No reservations found.", {
            position: "top-right",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        toast.error("Failed to fetch reservations. Please try again.", {
          position: "top-right",
          duration: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMostRecentReservation();
  }, []);

  return (
    <div className="inset-0 fixed z-50 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg flex flex-col gap-4 relative">
        <div className="absolute right-3 top-3">
          <IoClose
            className="font-bold text-2xl cursor-pointer text-white bg-red-500 rounded-lg"
            onClick={togglesummary}
          />
        </div>
        <h2 className="text-2xl font-bold text-center">Reservation Summary</h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : reservation ? (
          <div className="flex flex-col gap-3">
            <p>
              <strong>Name:</strong> {reservation.name}
            </p>
            <p>
              <strong>Phone:</strong> {reservation.phone}
            </p>
            <p>
              <strong>Guests:</strong> {reservation.guest}
            </p>
            <p>
              <strong>Date:</strong> {new Date(reservation.date).toDateString()}
            </p>
            <p>
              <strong>Time:</strong> {reservation.time}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No reservation data found.</p>
        )}
        <button
          className="bg-purple-500 font-semibold rounded-lg hover:bg-purple-600 p-2 mx-auto text-white flex justify-center mt-4"
          onClick={togglesummary}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Summary;
