"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast, Toaster } from "sonner";
import { useDateContext } from "@/context/DateContext";
import { useTimeContext } from "@/context/TimeContext";

type Props = { handletimepopup: () => void };
interface DateForm {
  name: string;
  phone: string;
  guest: number;
  date: Date;
  time: string;
}

const Slot = ({ handletimepopup }: Props) => {
  const { setDate } = useDateContext();
  const { setTime } = useTimeContext();
  const [hide, setHide] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<DateForm[]>([]);
  const [slotAvailability, setSlotAvailability] = useState<{
    [key: string]: boolean;
  }>({
    "12:00 PM": true,
    "02:00 PM": true,
    "04:00 PM": true,
    "06:00 PM": true,
    "08:00 PM": true,
    "10:00 PM": true,
  });

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch("https://backend-beryl-omega.vercel.app/api/get");
        const result = await res.json();
        setData(result.reservations);
      } catch (err) {
        console.error(err);
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const updatedSlots = {
      "12:00 PM": true,
      "02:00 PM": true,
      "04:00 PM": true,
      "06:00 PM": true,
      "08:00 PM": true,
      "10:00 PM": true,
    };

    data.forEach((reservation) => {
      const reservationDate = new Date(reservation.date).toISOString().split("T")[0];
      const selectedDateStr = selectedDate.toISOString().split("T")[0];

      if (reservationDate === selectedDateStr) {
        updatedSlots[reservation.time as keyof typeof updatedSlots] = false;
      }
    });

    setSlotAvailability(updatedSlots);
  }, [data, selectedDate]);

  const handleSelect = (time: string) => {
    if (slotAvailability[time]) {
      setSelectedSlot(time);
    } else {
      toast.error("This slot is already reserved.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const checkDate = () => {
    const currentDate = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(currentDate.getMonth() + 1);

    if (selectedDate > currentDate && selectedDate < oneMonthFromNow) {
      setDate(selectedDate);
      setHide(false);
    } else {
      toast.error("Please select a date within the next month.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleselectedtime = async () => {
    if (selectedSlot) {
      setTime(selectedSlot);

      try {
        const response = await fetch("https://backend-beryl-omega.vercel.app/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            phone: "1234567890",
            guest: 2,
            date: selectedDate,
            time: selectedSlot,
          }),
        });

        if (response.ok) {
          toast.success(`You have successfully reserved the slot ${selectedSlot}`);
          handletimepopup();
        } else {
          throw new Error("Failed to create reservation");
        }
      } catch (err) {
        toast.error(`Failed to reserve the slot. Please try again.${err}`, {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Please select a time slot.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Toaster richColors={true} />
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Select Time Slot</h2>
          <button
            onClick={handletimepopup}
            className="absolute right-4 top-4 p-1 rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
          >
            <IoClose className="text-white text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date Input */}
          <div className="space-y-4">
            <input
              type="date"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-center focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            
            {hide && (
              <button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                onClick={checkDate}
              >
                Check available timeslots
              </button>
            )}
          </div>

          {/* Time Slots Grid */}
          {!hide && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(slotAvailability).map((time) => (
                  <button
                    key={time}
                    onClick={() => handleSelect(time)}
                    className={`p-3 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-md
                      ${
                        slotAvailability[time]
                          ? selectedSlot === time
                            ? "bg-blue-500 text-white shadow-blue-200"
                            : "bg-green-500 text-white shadow-green-200"
                          : "bg-red-500 text-white shadow-red-200 cursor-not-allowed"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>Selected</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                onClick={handleselectedtime}
              >
                {selectedSlot ? "Confirm Reservation" : "Select a time slot"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slot;