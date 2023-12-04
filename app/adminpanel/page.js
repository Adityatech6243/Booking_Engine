"use client";
import Container from "react-bootstrap/Container";
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

const formSchema = z.object({
  CheckIn: z.date(),
  CheckOut: z.date(),
});

// export function CalendarForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   })
// }
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
    },
  });
  // const handleSubmit(event) {
  //     event.preventDefault();
  //     // Handle form submission
  //     // ...
  //   };
  function onSubmit(values) {
    //setSearchData(values);
  }
  const [isLoggedIn, setLoggedIn] = useState(true);

  // Function to handle login
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("test");
    async function sendData() {
      let tempSendData = await fetch(`//${basepath}/index.php`, {
        method: "POST",
        body: JSON.stringify({ username: UserEmail, password: UserPass }),
      })
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
          return "{}";
        });
      setLoggedIn(Boolean(tempSendData));
    }

    sendData();
    //  setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic
    setLoggedIn(false);
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
        }),
      })
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
          return "[]";
        });
      console.log("array ala re", tempSendData);
      setBookingArray(tempSendData);
    }

    sendData();
    //  setLoggedIn(true);
  };
   const handlebookingdel = (bookingRoomId, checkIn, checkOut) => {
     event.preventDefault();
     console.log("click kel re");
     async function sendData() {
       let tempSendData = await fetch(`//${basepath}/index.php`, {
         method: "POST",
         body: JSON.stringify({
           bookingRoomId: bookingRoomId,
           checkInDate: checkIn,
           checkOutDate: checkOut,
         }),
       })
         .then((response) => response.json())
         .then((json) => json)
         .catch((error) => {
           return "[]";
         });
       console.log("del array ala re", tempSendData);
       setBookingDelArray(tempSendData);
     }

     sendData();
     //  setLoggedIn(true);
   };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center  mx-auto md:h-screen">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img src="Logo.png" alt="logo" className="w-20" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border p-5 md:mt-0 dark:bg-gray-800 dark:border-gray-700">
          {isLoggedIn ? (
            <section>
              <table className="table-bordered p-2 w-full">
                <thead>
                  <tr>
                    <th>Room Category</th>
                    <th>Bookings</th>
                  </tr>
                </thead>
                <tbody className="p-2">
                  {roomsAndBookings?.rooms?.map((room) => (
                    <tr key={room.RoomID}>
                      <td>{room.RoomName}</td>
                      <td>
                        {roomsAndBookings?.bookings?.map(
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
                                {`${new Date(
                                  booking.CheckInDate
                                ).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })} to ${new Date(
                                  booking.CheckOutDate
                                ).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}`}
                                <button
                                  onClick={() =>
                                    handlebookingdel(
                                      booking.BookingRoomID,
                                      booking.CheckInDate,
                                      booking.CheckOutDate
                                    )
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
              <div className="p-2">
                <button
                  onClick={handleToggle}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Edit Prices
                </button>
                {showDiv && (
                  <div>
                    <h3 className="text-center">Edit Prices</h3>
                    <form
                      className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:w-full"
                      onSubmit={handleSubmit}
                    >
                      <div className="md:w-full">
                        <label htmlFor="option" className="text-gray-600 block">
                          <b>Select Room:</b>
                        </label>
                        <select
                          id="option"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                          {roomsAndBookings?.rooms?.map((item) => (
                            <option key={item.RoomID} value={item.RoomID}>
                              {item.RoomName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:w-full mt-0">
                        <label htmlFor="input1" className="text-gray-600 block">
                          <b>With Breakfast:</b>
                        </label>
                        <input
                          type="text"
                          id="input1"
                          value={input1}
                          onChange={handleInput1Change}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          placeholder="Enter Price With Breakfast Here"
                          min="0"
                          pattern="^[0-9]+$"
                        />
                      </div>
                      <div className="md:w-full mt-0">
                        <label htmlFor="input2" className="text-gray-600 block">
                          <b>With All Meals:</b>
                        </label>
                        <input
                          type="text"
                          id="input2"
                          value={input2}
                          onChange={handleInput2Change}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                          placeholder="Enter Price With All Meal Here"
                          min="0"
                          pattern="^[0-9]+$"
                        />
                      </div>
                      <div className="md:justify-center flex items-center mt-4">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-center">Add Bookings</h3>
                <Form {...form}>
                  <form
                    className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:w-full"
                    onSubmit={handleBooking}
                  >
                    <div className="md:w-full">
                      <label htmlFor="option" className="text-gray-600 block">
                        Select Room:
                      </label>
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
                    </div>
                    <div className="md:w-full mt-0">
                      <FormField
                        control={form.control}
                        name="CheckIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-gray-600">
                              Check In Date
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
                                    <span>Select Check In Date</span>
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
                                      JSON.stringify(
                                        form.control._formValues.CheckIn
                                      )
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
                    <div className="md:w-full mt-0">
                      <FormField
                        control={form.control}
                        name="CheckOut"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-gray-600">
                              Check Out Date
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
                                    <span>Select Check Out Date</span>
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
                                      JSON.stringify(
                                        form.control._formValues.CheckOut
                                      )
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
                    <div className="md:justify-center flex items-center">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Book
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded"
              >
                Logout
              </button>
            </section>
          ) : (
            <section className="bg-gray-50 dark:bg-gray-900">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={UserEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
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
    </div>
  );
}

export default Adminpanel;
