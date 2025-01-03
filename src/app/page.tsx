"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDateContext } from "@/context/DateContext";
import { useTimeContext } from "@/context/TimeContext";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import Decorations from "@/components/Decorations";
import Slot from "@/components/Slot";
import Summary from "@/components/Summary";

interface DateForm {
  _id?: string;
  name: string;
  phone: string;
  guest: number;
  date: Date | null;
  time: string | null;
}

interface Reservation extends Omit<DateForm, "date"> {
  date: string | Date | null;
  _id?: string;
}

export default function Home() {
  const [timePopup, setTimePopup] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<DateForm>({
    name: "",
    phone: "",
    guest: 0,
    date: null,
    time: null,
  });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<string>("");
  const [summary, setSummary] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const { date } = useDateContext();
  const { time } = useTimeContext();

  useEffect(() => {
    if (date) {
      setFormdata((prev) => ({ ...prev, date }));
    }
    if (time) {
      setFormdata((prev) => ({ ...prev, time }));
    }
  }, [date, time]);

  const validateForm = (): boolean => {
    if (!formdata.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formdata.phone.trim() || formdata.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formdata.guest || formdata.guest <= 0) {
      toast.error("Please enter a valid number of guests");
      return false;
    }
    if (!formdata.date || !formdata.time) {
      toast.error("Please select both date and time");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "phone") {
      if (!/^\d*$/.test(value)) {
        toast.error("Please enter numbers only");
        return;
      }
      if (value.length > 10) {
        toast.error("Phone number cannot exceed 10 digits");
        return;
      }
      setFormdata((prev) => ({
        ...prev,
        [id]: value,
      }));
    } else if (id === "guest") {
      const guestNumber = parseInt(value) || 0;
      if (guestNumber > 20) {
        toast.error("Maximum 20 guests allowed");
        return;
      }
      setFormdata((prev) => ({
        ...prev,
        guest: guestNumber,
      }));
    } else {
      setFormdata((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      toast.success("Reservation created successfully!");
      
      setFormdata({
        name: "",
        phone: "",
        guest: 0,
        date: null,
        time: null,
      });
      
      await handleGetReservations();
    } catch (error) {
      console.error("Failed to create reservation:", error);
      toast.error("Failed to create reservation. Please try again.",{
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      setSummary(true);
    }
  };

  const handleGetReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/get");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      toast.error("Failed to fetch reservations. Please try again.",{
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!id) {
      toast.error("Invalid reservation ID",
        {
          position: "top-right",
          duration: 2000,
        }
      );
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This reservation will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          setIsDeleting(id);
          try {
            const response = await fetch(
              `http://localhost:5000/api/delete/${id}`,
              {
                method: "DELETE",
              }
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response;
          } catch (error) {
            Swal.showValidationMessage(
              `Delete failed: ${error}`
            );
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (result.isConfirmed) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation._id !== id)
        );
        
        toast.success("Reservation deleted successfully!", {
          position: "top-right",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      toast.error("Failed to delete reservation. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setIsDeleting("");
    }
  };

  const formatDate = (dateString: string | Date | null): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <main className="pt-16 mb-8 min-h-screen">
      {timePopup && <Slot handletimepopup={() => setTimePopup(false)} />}
      <Toaster richColors position="top-right" />
      {summary && (<Summary togglesummary={() => setSummary(false)} />)}
      <Decorations />
      <div className="flex flex-col max-w-3xl mx-auto p-8 gap-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-sans">
          Reserve Your Table
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-4 rounded-3xl border-purple-500">
          <div className="col-span-1">
            <img
              src="restaurant.webp"
              alt="Restaurant interior"
              className="rounded-3xl hidden lg:flex object-cover w-80 h-96 p-1"
            />
          </div>
          <div className="col-span-1 p-2 pt-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-center font-semibold text-2xl">
                Enter the Details
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 justify-center p-4"
              >
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                  value={formdata.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-500 rounded-md p-2 font-sans font-semibold hover:border-purple-500"
                />
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your Phone Number"
                  value={formdata.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className="border-2 border-gray-500 hover:border-purple-500 font-semibold font-sans rounded-md p-2"
                />
                <input
                  type="number"
                  id="guest"
                  placeholder="Enter the Number of Guests"
                  value={formdata.guest === 0 ? "" : formdata.guest}
                  onChange={handleChange}
                  required
                  min="1"
                  max="20"
                  className="border-2 border-gray-500 rounded-md p-2 font-sans font-semibold hover:border-purple-500"
                  style={{ appearance: "none" }}
                />

                {formdata.date && formdata.time ? (
                  <p className="text-center text-green-400 font-semibold text-xl">
                    {formdata.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {formdata.time}
                  </p>
                ) : (
                  <button
                    type="button"
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setTimePopup(true)}
                  >
                    Select date & time slot
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded-full p-2 transition-all duration-300 hover:-translate-y-1 hover:from-purple-400 hover:to-purple-600 font-semibold ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Confirm Reservation'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={isLoading}
          className={`bg-green-500 rounded-xl p-2 text-white font-semibold max-w-48 mx-auto transition-all duration-300 hover:bg-green-600 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          } ${reservations.length === 0 ? 'hidden' : ''}`}
          onClick={handleGetReservations}
        >
          {isLoading ? 'Loading...' : 'See All Reservations'}
        </button>

        {reservations.length > 0 && (
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Guests</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Time</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.filter((reservation) => reservation.name !== "John Doe") // Exclude "John Doe"
                .map((reservation, index) => (
                  <tr 
                    key={reservation._id || `reservation-${index}`}
                    className="text-center"
                  >
                    <td className="border border-gray-300 p-2">{reservation.name}</td>
                    <td className="border border-gray-300 p-2">{reservation.phone}</td>
                    <td className="border border-gray-300 p-2">{reservation.guest}</td>
                    <td className="border border-gray-300 p-2">
                      {formatDate(reservation.date)}
                    </td>
                    <td className="border border-gray-300 p-2">{reservation.time}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        disabled={isDeleting === reservation._id}
                        onClick={() => handleDeleteReservation(reservation._id!)}
                        className={`bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ${
                          isDeleting === reservation._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isDeleting === reservation._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}