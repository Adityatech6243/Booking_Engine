"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { basepath } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toIST } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  CheckIn: z.date(),
  CheckOut: z.date(),
  priceWithAllMeals: z.string(),
  priceWithBreakfast: z.string(),
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userPhone: z.string(),
});
function Adminpanel(props) {
  const [selectedOption, setSelectedOption] = useState("1");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [UserEmail, setUserEmail] = useState("");
  const [UserPass, setUserPass] = useState("");
  const [bookingRoomId, setBookingRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsAndBookings, setRoomsAndBookings] = useState({});
  const [roomId, setRoomId] = useState("");
  const [priceWithBreakfast, setPriceWithBreakfast] = useState("");
  const [priceWithAllMeals, setPriceWithAllMeals] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const phoneNumberRegex = /^[0-9]{10}$/; // This example assumes a 10-digit number
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsValidPhoneNumber(phoneNumberRegex.test(value));
  };

  const MessageBox = ({ message, onClose }) => {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-black shadow-2xl p-12 rounded-lg">
        <p className="text-center mb-7">{message}</p>
        <button
          onClick={onClose}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    );
  };
  useEffect(() => {
    setBookingRoomId(roomsAndBookings?.rooms?.[0].RoomID);
    setRoomId(roomsAndBookings?.rooms?.[0].RoomID);
  }, [roomsAndBookings]);

  useEffect(() => {
    setPriceWithAllMeals(
      roomsAndBookings?.rooms?.filter((item) => item.RoomID == roomId)[0]
        .withAllMealsPrice
    );
    setPriceWithBreakfast(
      roomsAndBookings?.rooms?.filter((item) => item.RoomID == roomId)[0]
        .withBreakfastPrice
    );
  }, [roomId]);

  useEffect(() => {
    async function fetchData() {
      fetch(`//${basepath}/index.php?getAllBookings`)
        .then((response) => response.json())
        .then((response) => setRoomsAndBookings(response))
        .catch((error) => {
          return "error";
        });
    }
    fetchData();
  }, []);

  const handleToggle = () => {
    setShowDiv(!showDiv);
  };

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Selected Option:", selectedOption);
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CheckIn: "",
      CheckOut: "",
      priceWithAllMeals: "",
      priceWithBreakfast: "",
      userName: "",
      userPhone: "",
      // userName // userPhone
    },
  });
  function onSubmit(values) {
    //setSearchData(values);
  }
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = (event) => {
    event.preventDefault();
   // console.log("test");
   async function sendData() {
    let tempSendData = await fetch(`//${basepath}/index.php`, {
      method: "POST",
      body: JSON.stringify({ username: UserEmail, password: UserPass }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => json)
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        return false; // return false if there's an error
      });
     if(Boolean(tempSendData)==false){
      alert("Please Enter Correct Username Or Password")
     }
    setLoggedIn(Boolean(tempSendData));
  }

    sendData();
    //  setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic
    setLoggedIn(false);
    window.location.reload();
  };
  // Function to handle login
  const handleBooking = (event) => {
    event.preventDefault();
    console.log("book re");
    async function sendData() {
      let tempSendData = await fetch(`//${basepath}/index.php`, {
        method: "POST",
        body: JSON.stringify({
          bookingRoomId: bookingRoomId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          userName: form.control._formValues.userName,
          userPhone: form.control._formValues.userPhone,
          newBooking: true,
        }),
      })
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
          return "[]";
        });

      setRoomsAndBookings({
        ...roomsAndBookings,
        bookings: tempSendData,
      });
    }
    const bookingSuccessful = true;
    if (bookingSuccessful) {
      // If booking is successful, show the message box
      setShowMessageBox(true);
    }

    sendData();
    //  setLoggedIn(true);
  };
  const handlebookingdel = (bookingID) => {
    event.preventDefault();
    console.log("click kel re");
    async function sendData() {
      let tempSendData = await fetch(`//${basepath}/index.php`, {
        method: "POST",
        body: JSON.stringify({
          bookingID: bookingID,
          delete: true,
        }),
      })
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
          return "[]";
        });
      if (tempSendData == true) {
        setRoomsAndBookings({
          ...roomsAndBookings,
          bookings: roomsAndBookings.bookings.filter(
            (item) => item.BookingID !== bookingID
          ),
        });
      }
    }

    sendData();
    //  setLoggedIn(true);
  };

  const handlePricechange = (event) => {
    event.preventDefault();
    console.log("price re", roomId, priceWithAllMeals, priceWithBreakfast);
    async function sendData() {
      let tempSendData = await fetch(`//${basepath}/index.php`, {
        method: "POST",
        body: JSON.stringify({
          roomId: roomId,
          priceWithBreakfast: priceWithBreakfast,
          priceWithAllMeals: priceWithAllMeals,
          changePrice: true,
        }),
      })
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
          return "[]";
        });
      if (tempSendData == true) {
        alert("Price Updated, Reloading Page");
        setTimeout(
          () => (typeof window !== "undefined" ? window.location.reload() : ""),
          2000
        );
      }
    }
    sendData();
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center  mx-auto md:h-screen">
      <div className="w-full  p-5 md:mt-0">
        <a
          href="#"
          className="flex justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white "
        >
          <img src="/booking-engine/Logo.png" alt="logo" className="w-25 h-25"  />
        </a>
        
          {isLoggedIn ? (
            <section>
              <div className="flex justify-end pb">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded font-bold py-2 px-8"
                >
                  Logout
                </button>
              </div>
              <table className="table-bordered p-2 w-full">
                <thead>
                  <tr>
                    <th className="text-left pb-10">
                      <b >Room Category</b>
                    </th>
                    <th className="text-left pb-10">
                      <b>Bookings</b>
                    </th>
                  </tr>
                </thead>
                <tbody className="p-2">
                  {roomsAndBookings?.rooms?.map((room) => (
                    <tr key={room.RoomID} className="border-b-2">
                      <td className="py-2">{room.RoomName}</td>
                      <td>
                        {Array.isArray(roomsAndBookings?.bookings) &&
                          roomsAndBookings?.bookings.map(
                            (booking, index) =>
                              room.RoomID == booking.BookingRoomID && (
                                <span
                                  className="m-2 inline-block"
                                  key={index}
                                  style={{
                                    backgroundColor: "green",
                                    padding: "4px 14px",
                                    color: "white",
                                    borderRadius: "10px",
                                    position: "relative",
                                  }}
                                >
                                  {`${toIST(booking.CheckInDate)} to ${toIST(
                                    booking.CheckOutDate
                                  )}`}
                                  <button
                                    onClick={() =>
                                      handlebookingdel(booking.BookingID)
                                    }
                                    className="bg-white-500 text-white rounded fas fa-times"
                                    style={{
                                      borderRadius: "50%",
                                      margin: "-2px -6px",
                                      padding: "2px 6px 0px 6px",
                                      backgroundColor: "#030303",
                                      position: "absolute",
                                      top: "-2px",
                                      right: "2px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {" "}
                                    X
                                  </button>
                                </span>
                              )
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <h2 className="text-center mt-10">
                  <b>Add Bookings</b>
                </h2>
                <Form {...form}>
                  <form
                    className="flex flex-col md:flex-col md:w-full"
                    onSubmit={handleBooking}
                  >
                    <div className="md:flex md:justify-between">
                      <div className="w-full md:pr-4 mt-4">
                        <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-gray-600">
                                <b>Name:</b>
                              </FormLabel>
                              <FormControl className="w-full px-3 py-2 rounded-md focus:outline-none">
                                <Input
                                  placeholder="Enter Name"
                                  {...field}
                                  type="text"
                                  required
                                  pattern="[A-Za-z\s]+"
                                  className="pl-4"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full mt-4 ">
                        <FormField
                          control={form.control}
                          name="userPhone"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-gray-600">
                                <b>Phone Number:</b>
                              </FormLabel>
                              <FormControl className="w-full px-3 py-2 rounded-md focus:outline-none">
                                <Input
                                  value={phoneNumber}
                                  onChange={handlePhoneNumberChange}
                                  placeholder="Enter Phone Number"
                                  {...field}
                                  type="tel"
                                  required
                                  pattern="\d{10}"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:justify-between">
                      <div className="w-full md:pr-4 mt-4">
                        <FormField
                          control={form.control}
                          name="CheckIn"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-gray-600">
                                <b>Check In Date</b>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "justify-start text-left font-normal ",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>
                                        <b>Select Check In Date</b>
                                      </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    selected={field.value}
                                    mode="single"
                                    onSelect={(e) => {
                                      field.onChange(e);
                                      setCheckIn(
                                        form.control._formValues.CheckIn
                                      );
                                    }}
                                    disabled={(date) => date < new Date()}
                                    minDate={new Date()} // Set the minimum date to the current date
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:w-full mt-4">
                        <FormField
                          control={form.control}
                          name="CheckOut"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-gray-600">
                                <b>Check Out Date</b>
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>
                                        <b>Select Check Out Date</b>
                                      </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(e) => {
                                      field.onChange(e);
                                      setCheckOut(
                                        form.control._formValues.CheckOut
                                      );
                                    }}
                                    disabled={(date) =>
                                      date <
                                      new Date(
                                        form.control._formValues?.CheckIn
                                      ).setDate(
                                        new Date(
                                          form.control._formValues?.CheckIn
                                        ).getDate() + 1
                                      )
                                    }
                                    minDate={new Date(
                                      form.control._formValues?.CheckIn
                                    ).setDate(
                                      new Date(
                                        form.control._formValues?.CheckIn
                                      ).getDate() + 1
                                    )} // Set the minimum date to the current date
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="md:w-full mt-4">
                      <FormField
                        control={form.control}
                        name="CheckIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-gray-600">
                              <b>Select Room:</b>
                            </FormLabel>
                            <select
                              id="option"
                              value={bookingRoomId}
                              onChange={(e) => setBookingRoomId(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            >
                              {roomsAndBookings?.rooms?.map((item) => (
                                <option key={item.RoomID} value={item.RoomID}>
                                  {item.RoomName}
                                </option>
                              ))}
                            </select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="p-2 mt-3">
                      <button
                        type="submit"
                        disabled={
                          !(
                            form.control._formValues?.CheckIn &&
                            form.control._formValues?.CheckOut
                          )
                        }
                        className={`bg-blue-500  text-white font-bold py-2 px-10 rounded ${
                          form.control._formValues?.CheckIn &&
                          form.control._formValues?.CheckOut
                            ? ""
                            : "bg-gray-500"
                        }`}
                        onClick={() => {
                          if (
                            form.control._formValues?.UserName &&
                            phoneNumberRegex.test(
                              form.control._formValues?.UserPhone
                            )
                          ) {
                            console.log(e);
                          }
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
              <hr className="my-8" />
              <div className="p-2 mb-4">
                <button
                  onClick={handleToggle}
                  className="bg-blue-500 text-white p-2 font-bold py-2 px-4 rounded "
                >
                  Edit Prices
                </button>
                {showDiv && (
                  <div>
                    <Form {...form}>
                      <form
                        className="flex flex-col md:flex-row md:space-x-4 md:w-full"
                        onSubmit={handlePricechange}
                      >
                        <div className="md:w-full space-y-2 mt-4">
                          <label
                            htmlFor="option"
                            className="text-gray-600 block"
                          >
                            <b>Select Room:</b>
                          </label>
                          <select
                            id="option"
                            value={roomId}
                            onChange={(e) => {
                              setRoomId(e.target.value);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          >
                            {roomsAndBookings?.rooms?.map((item) => (
                              <option
                                key={item.RoomID}
                                value={item.RoomID}
                                className="text-sm p-2"
                              >
                                {item.RoomName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:w-full mt-4">
                          <FormField
                            control={form.control}
                            name="priceWithBreakfast"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <b>With Breakfast:</b>
                                  <sup className="text-red-500">*</sup>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Room Price with Breakfast"
                                    {...field}
                                    value={priceWithBreakfast}
                                    type="number"
                                    required
                                    onChange={(e) => {
                                      setPriceWithBreakfast(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:w-full mt-4">
                          <FormField
                            control={form.control}
                            name="priceWithAllMeals"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <b>With All Meals: </b>
                                  <sup className="text-red-500">*</sup>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter Room Price with All Meals"
                                    {...field}
                                    value={priceWithAllMeals}
                                    type="number"
                                    required
                                    onChange={(e) => {
                                      setPriceWithAllMeals(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="md:justify-center flex items-end mt-4">
                          <button
                            type="submit"
                            // className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            disabled={
                              !(priceWithBreakfast && priceWithAllMeals)
                            }
                            className={`bg-blue-500  text-white font-bold p-2 py-2 px-4 rounded ${
                              priceWithBreakfast && priceWithAllMeals
                                ? ""
                                : "bg-gray-500"
                            }`}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="bg-white rounded-lg shadow dark:border sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-96 mx-auto">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pt-5">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6 p-5" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={UserEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={UserPass}
                    onChange={(e) => setUserPass(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                <button
                  type="submit"
                  className="flex items-center"
                  style={{
                    textTransform: "uppercase",
                    textAlign: "center",
                    color: "white",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#cf549e",
                  }}
                >
                  Sign in
                </button>
              </form>
            </section>
          )}
        </div>
      </div>
      {showMessageBox && (
        <MessageBox
          message="Room Booked Successfully"
          onClose={() => setShowMessageBox(false)} // Function to close the message box
        />
      )}
    </div>
  );
}

export default Adminpanel;
