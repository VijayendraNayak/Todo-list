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

  // Fetch reservations from the backend
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/get");
        const result = await res.json();
        setData(result.reservations); // Update reservations
      } catch (err) {
        console.error(err);
      }
    };
    getdata();
  }, []);

  // Update slot availability based on the selected date
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
      const reservationDate = new Date(reservation.date)
        .toISOString()
        .split("T")[0];
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
      toast.error("Please select a date within the next month.",{
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleselectedtime = async () => {
    if (selectedSlot) {
      setTime(selectedSlot);

      try {
        const response = await fetch("http://localhost:5000/api/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe", // Replace with dynamic user input
            phone: "1234567890", // Replace with dynamic user input
            guest: 2, // Replace with dynamic user input
            date: selectedDate,
            time: selectedSlot,
          }),
        });

        if (response.ok) {
          toast.success(
            `You have successfully reserved the slot ${selectedSlot}`
          );
          handletimepopup();
        } else {
          throw new Error("Failed to create reservation");
        }
      } catch (err) {
        toast.error(`Failed to reserve the slot. Please try again.${err}`,{
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Please select a time slot.",{
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="inset-0 fixed bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Toaster richColors={true} />
      <div className="bg-white p-4 rounded-lg w-96 h-96 my-auto flex flex-col gap-4 justify-center relative">
        <div className="text-3xl font-bold text-center">Select Time Slot</div>
        <div className="absolute right-3 top-3">
          <IoClose
            className="font-bold text-2xl cursor-pointer text-white bg-red-500 rounded-lg"
            onClick={handletimepopup}
          />
        </div>
        <input
          type="date"
          className="p-2 border-2 text-center flex justify-center rounded-lg border-black"
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
        {hide && (
          <button
            className="bg-purple-500 rounded-lg hover:bg-purple-600 p-2 mx-4 text-white flex justify-center"
            onClick={checkDate}
          >
            Check available timeslots
          </button>
        )}
        {!hide && (
          <>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {Object.keys(slotAvailability).map((time) => (
                <div
                  key={time}
                  className={`p-2 rounded-lg cursor-pointer transition-all hover:-translate-y-1 text-center ${
                    slotAvailability[time]
                      ? selectedSlot === time
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={() => handleSelect(time)}
                >
                  {time}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <div className="w-5 h-5 bg-red-500 text-white text-center flex items-center justify-center"></div>
              <span>Unavailable Slot</span>
              <div className="w-5 h-5 bg-green-500 text-white text-center flex items-center justify-center ml-4"></div>
              <span>Available Slot</span>
            </div>
            <button
              className="bg-purple-500 font-semibold rounded-lg hover:bg-purple-600 p-2 mx-4 text-white flex justify-center mt-4"
              onClick={handleselectedtime}
            >
              {selectedSlot ? "Confirm Reservation" : "Select another date"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Slot;
