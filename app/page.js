"use client";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/constant";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Availability } from "@/components/availability";
import { Details } from "@/components/details";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyNavbar from "@/components/header";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import emailjs from "emailjs-com";

const formSchema = z.object({
  CheckIn: z.date(),
  CheckOut: z.date(),
  Rooms: z.string(),
  Childrens: z.string(),
  Adults: z.string(),
  Child1Age: z.string(),
  Child2Age: z.string(),
  Child3Age: z.string(),
});
export default function Home() {
  const refreshPage = () => {
    window.location.reload();
  };
  const [data, setData] = useState({});
  const [roomdata, setRoomData] = useState();

  const [searchdata, setSearchData] = useState();
  const [childrensCount, setChildrensCount] = useState(0);
  const [finaldata, setFinalData] = useState({});
  const [stayNights, setStayNights] = useState();
  const [result, setResult] = useState(0);
  const [withbreakfastExtrabed, setWithBreakFastExtraBed] = useState(0);
  const [withbreakfastExtrabedCharg, setWithBreakFastExtraBedCharg] =
    useState(0);

  const [activeItem, setActiveItem] = useState("item-1");
  const [review, setReview] = useState();
  // const [checkIn, setCheckIn] = useState("abcd");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [edit1, enableEdit1] = useState();
  const [edit2, enableEdit2] = useState();
  const [edit4, enableEdit4] = useState();

  const handleSearch = (value) => {
    setActiveItem(value);
  };

  const handleSetFinalData = (x) => {
    const arr = { ...finaldata, ...x };
    setFinalData(arr);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CheckIn: "",
      CheckOut: "",
      Rooms: "1",
      Adults: "1",
      Childrens: "0",
      Child1Age: "",
      Child2Age: "",
      Child3Age: "",
    },
  });

  useEffect(() => {
    if (searchdata?.CheckIn && searchdata?.CheckOut) {
      const startDate = new Date(searchdata.CheckIn);
      const endDate = new Date(searchdata.CheckOut);

      const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
      const diffDays = Math.round((endDate - startDate) / oneDay);
      setStayNights(diffDays);
      console.log(
        `The difference between check-in and check-out is ${diffDays} days.`
      );

      handleSetFinalData(searchdata);

      searchdata.ClientID = "1";
      searchdata.searchAvailability = "true";
      async function sendData() {
        let tempSendData = await fetch("//localhost/index.php", {
          method: "POST",
          body: JSON.stringify(searchdata),
        })
          .then((response) => response.text())
          .then((json) => json)
          .catch((error) => {
            return "[]";
          });
        if (tempSendData) {
          setRoomData(JSON.parse(tempSendData));
        } else if (tempSendData === "alreadyExists") {
          alert("exist");
        } else {
          console.log("php error");
        }
      }
      sendData();
    }
  }, [searchdata]);
  // useEffect(() => console.log("dd", review), [review]);
  useEffect(() => {
    if (childrensCount == 0) {
      form.control._formValues.Child1Age = "";
      form.control._formValues.Child2Age = "";
      form.control._formValues.Child3Age = "";
    }
    if (childrensCount == 1) {
      form.control._formValues.Child2Age = "";
      form.control._formValues.Child3Age = "";
    }
    if (childrensCount == 2) {
      form.control._formValues.Child3Age = "";
    }
  }, [childrensCount]);

  useEffect(() => {
    async function fetchData() {
      fetch("//localhost/index.php?ClientID=1")
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((error) => {
          setData({
            client: {
              ClientID: "1",
              ClientBusinessName: "River Orchid Resort",
              ClientName: "Sitaram Karande",
              ClientEmail: "riverorchid1313@gmail.com",
              ClientPhone: "+91-9405751313 / +91-9158785725 / +91-9403268501",
              ClientAddress: "Tapola",
            },
            policies: {
              CheckIn: "12:00 PM",
              CheckOut: "12:00 AM",
              LateCheckOut: "Subject To Availability",
              CancellationPolicies: [
                " If cancelled before 15 days of Check In date refundable amount would Be 100% of total billing.",
                "If cancelled before 7 days of Check In date refundable amount would Be 50% of total billing.",
                "If cancelled before 6 days of Check In date booking will Be Non Refundable.",
              ],
              PolicyID: "1",
            },
          });
          return "error";
        });
    }
    fetchData();
  }, []);

  function onSubmit(values) {
    setSearchData(values);
  }
  // emailjs code here to send mail
  emailjs.init("dVPPPyRhEoB6ft-B_");
  const PayNow = () => {
    const emailData = {
      ...review,
      subject: "Test: New Booking Confirmed For River Orchid Resort",
      to: "riverorchid1313@gmail.com",
      clientName: "River Orchid Resort",
      replyTo: review?.UserEmail,
      CheckInDate: new Date(review?.CheckInDate)?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      CheckOutDate: new Date(review?.CheckOutDate)?.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
    };

    // Send the email
    emailjs
      .send(
        "BookingReceipt",
        "template_t9zwh3u",
        emailData,
        "dVPPPyRhEoB6ft-B_"
      )
      .then((response) => {
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        console.error("Email send failed", error);
      });
  };

  useEffect(() => {
    console.log("finaldata: ", finaldata);
  }, [finaldata]);

  return (
    <main className="flex min-h-screen flex-col justify-between lg:p-24 lg:py-0 bg-[#f9f9f9]">
      <MyNavbar />
      <div className="relative h-48" style={{ backgroundImage: `url(/1.jpg)` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-opacity-60 text-white p-4  bg-gray-400 rounded-lg">
          <h1 className="font-bold text-2xl md:text-4xl">
            River Orchid Resort
          </h1>
          <p className="text-base sm:text-2xl md:text-xl lg:text-1xl xl:text-2xl">
            Tapola, Maharashtra 412806
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-9/12 p-4 bg-[#f9f9f9]">
          <Accordion type="single" collapsible="true" value={activeItem}>
            <AccordionItem value="item-1" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2 hover:no-underline">
                <div className="flex justify-between w-full">
                  <span>Search For Availability</span>
                  {edit1 == "item-1" && (
                    <span
                      className="px-4 py-1 hover:bg-[#a0a1a4] rounded-lg"
                      onClick={() => handleSearch("item-1")}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="w-4 h-4 mr-2"
                      />
                      Edit
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              {/* <FontAwesomeIcon icon={faEdit} /> */}
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-wrap flex-col md:flex-row items-center">
                      <div className="sm:1 md:w-1/3 w-[100%] p-4">
                        <FormField
                          control={form.control}
                          name="CheckIn"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>
                                Check In Date
                                <sup className="text-red-500">*</sup>
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
                                    onSelect={field.onChange}
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
                      <div className="sm:1 md:w-1/3 w-[100%] p-4">
                        <FormField
                          control={form.control}
                          name="CheckOut"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>
                                Check Out Date
                                <sup className="text-red-500">*</sup>
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
                                    onSelect={field.onChange}
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

                      <div className="sm:1 md:w-1/3 w-[100%] p-4">
                        <FormField
                          control={form.control}
                          name="Rooms"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Rooms</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="1" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="sm:1 md:w-1/3 w-[100%] p-4">
                        <FormField
                          control={form.control}
                          name="Adults"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Adults</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="1" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="sm:1 md:w-1/3 w-[100%] p-4">
                        <FormField
                          control={form.control}
                          name="Childrens"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Childrens</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(event) => {
                                    field.onChange(event);
                                    setChildrensCount(event);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="0" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {parseInt(childrensCount) > 0 &&
                        Array.from({
                          length: parseInt(childrensCount),
                        }).map((_, index) => (
                          <div
                            key={index}
                            className="sm:1 md:w-1/3 w-[100%] p-4"
                          >
                            <FormField
                              control={form.control}
                              name={`Child${index + 1}Age`} // Use an array to differentiate between child ages
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Child {index + 1} age</FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="0" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="6">6</SelectItem>
                                        <SelectItem value="7">7</SelectItem>
                                        <SelectItem value="8">8</SelectItem>
                                        <SelectItem value="9">9</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                    </div>
                    <Button
                      className="bg-[#9f1f63] text-white  ml-2 hover:bg-[#9f1f63]"
                      type="submit"
                      onClick={() => {
                        if (
                          form.control._formValues?.CheckIn &&
                          form.control._formValues?.CheckOut
                        ) {
                          handleSearch("item-2");
                          enableEdit1("item-1");
                        }
                      }}
                    >
                      Search
                    </Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2  hover:no-underline">
                <div className="flex justify-between w-full">
                  <span>Available Rooms</span>
                  {edit2 == "item-2" && (
                    <span
                      className="px-4 py-1 hover:bg-[#a0a1a4] rounded-lg"
                      onClick={() => handleSearch("item-2")}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="w-4 h-4 mr-2"
                      />
                      Edit
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {roomdata
                  ? roomdata?.map((item, i) => (
                      <Availability
                        className="pt-2"
                        room={item}
                        key={i}
                        setFinaldata={handleSetFinalData}
                        handleSearch={() => handleSearch("item-4")}
                        enableEdit2={() => enableEdit2("item-2")}
                      />
                    ))
                  : "All the rooms for these dates are booked, please select different dates."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2  hover:no-underline">
                {" "}
                <div className="flex justify-between w-full">
                  <span>Your Details</span>
                  {edit4 == "item-4" && (
                    <span
                      className="px-4 py-1 hover:bg-[#a0a1a4] rounded-lg"
                      onClick={() => handleSearch("item-4")}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="w-4 h-4 mr-2"
                      />
                      Edit
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Details
                  setReview={setReview}
                  setFinaldata={handleSetFinalData}
                  finaldata={finaldata}
                  handleSearch={() => handleSearch("item-5")}
                  enableEdit4={() => enableEdit4("item-4")}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2 hover:no-underline">
                Review Your Booking
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <h2
                    className="text-center font-extrabold mt-3"
                    style={{ color: "#9f1f63" }}
                  >
                    Your Details
                  </h2>
                  <ul className="flex flex-wrap flex-col lg:flex-row border-b ">
                    <li className="p-5 w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Name:</span>{" "}
                      {review?.UserName}
                    </li>
                    <li className="p-5 w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Mobile:</span>{" "}
                      {review?.UserPhone}
                    </li>
                    <li className="p-5 w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Email: </span>
                      {review?.UserEmail}
                    </li>
                    <li className="p-5 before:w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Address:</span>{" "}
                      {review?.UserAddress}
                    </li>
                    <li className="p-5 w:1 lg:w-1/2 ">
                      <span className="font-semibold">Special Request:</span>{" "}
                      {review?.SpecialRequest}
                    </li>
                  </ul>
                </div>
                <div>
                  <h2
                    className="text-center font-bold mt-3"
                    style={{color:"#9f1f63"}}
                  >
                    Booking Details
                  </h2>
                  <ul className="flex flex-wrap flex-col lg:flex-row border-b">
                    <li className="p-5 w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Check In Date:</span>{" "}
                      {new Date(review?.CheckInDate)?.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </li>
                    <li className="p-5 w:1 lg:w-1/2 border-b">
                      <span className="font-semibold">Check Out Date:</span>{" "}
                      {new Date(review?.CheckOutDate)?.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </li>
                    {/* <li className="p-5 lg: w-1/2">Rooms: {review?.Rooms}</li> */}
                    <li className="p-5 w:1 lg:w-1/2">
                      <span className="font-semibold">Room Type:</span>{" "}
                      {review?.BookingRoomType}
                    </li>
                  </ul>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] border-r border-2">
                          Room Name
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Guest
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Child
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Child Age
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Child Cost
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Nights
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Extrabed
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Extrabed Cost
                        </TableHead>
                        <TableHead className="border-r border-2">
                          Room Cost
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium border-r border-2">
                          {review?.RoomName}
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {finaldata?.Adults} Adult(s)
                        </TableCell>
                        <TableCell className="border-r border-2">
                          <span>{review?.NumChildrens} Child(s)</span>
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {Number(review?.NumChildrens) &&
                            [...Array(Number(review?.NumChildrens))].map(
                              (_, index) => (
                                <div key={index}>
                                  Child {index + 1}:{" "}
                                  {review[`Child${index + 1}Age`]} Year(s)
                                </div>
                              )
                            )}
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {currency}
                          {review?.ChildCost}/-
                        </TableCell>
                        <TableCell className="font-medium border-r border-2">
                          {review?.numberOfNights}
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {review?.ExtraBed}
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {currency}
                          {review?.ExtraBedCost}/-
                        </TableCell>
                        <TableCell className="border-r border-2">
                          {currency}
                          {review?.TotalPrice}/-
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h2 className="text-center font-bold mt-3"  style={{color:"#9f1f63"}}>Summary</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] border-2">
                          Grand Total
                        </TableHead>
                        <TableHead className="border-2">
                          {currency}
                          {review?.TotalPrice}/-
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium border-2">
                          (30%) Amount to be Paid
                        </TableCell>
                        <TableCell className="border-2">
                          {currency}
                          {review?.AmtToPaid}/-
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="flex">
                  <Button
                    className="ml-5 bg-[#9f1f63] text-white hover:bg-[#9f1f63] mt-2"
                    onClick={refreshPage}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={PayNow}
                    className="ml-5 bg-[#9f1f63] text-white hover:bg-[#9f1f63] mt-2"
                  >
                    Pay Now
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:w-3/12  p-4">
          <Accordion type="multiple" collapsible="true">
            <AccordionItem value="item-1" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2 hover:no-underline">
                Hotel Details
              </AccordionTrigger>
              <AccordionContent className="pt-4 pl-3">
                <p className="mb-1">
                  <b>Hotel Name: </b>
                  <br />
                  <span>{data?.client?.ClientBusinessName}</span>
                </p>
                <p className="mb-1">
                  <b>Email: </b>
                  <br />
                  <span>{data?.client?.ClientEmail}</span>
                </p>
                <p className="mb-1">
                  <b>Phone: </b>
                  <br />
                  <span>{data?.client?.ClientPhone}</span>
                </p>
                <p className="mb-1">
                  <b>Addres: </b>
                  <br />
                  <span>{data?.client?.ClientAddress}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2 hover:no-underline">
                Cancellation Policy
              </AccordionTrigger>
              <AccordionContent className="pt-4 pl-3">
                <ul className="list-inside list-disc">
                  {data?.policies?.CancellationPolicies?.map((elem, ind) => (
                    <li key={ind}> {elem}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-[#ffffff] my-1">
              <AccordionTrigger className="bg-[#9f1f63] text-white p-2  hover:no-underline">
                Check In/Out Policy
              </AccordionTrigger>
              <AccordionContent className="pt-4 pl-3">
                <p className="mb-1">
                  <b>Check In Time: </b>
                  <span>{data?.policies?.CheckIn}</span>
                </p>
                <p className="mb-1">
                  <b>Check Out Time: </b>
                  <span>{data?.policies?.CheckOut} </span>
                </p>
                <p className="mb-1">
                  <b>Late Check Out Allowed: </b>
                  <span>{data?.policies?.LateCheckOut}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
