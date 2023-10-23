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
  const [checkIn, setCheckIn] = useState("abcd");

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
        let tempSendData = await fetch("//192.168.1.11/index.php", {
          method: "POST",
          body: JSON.stringify(searchdata),
        })
          .then((response) => response.text())
          .then((json) => json)
          .catch((error) => {
            return "error";
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
  useEffect(() => console.log("dd", review), [review]);
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
      fetch("//192.168.1.11/index.php?ClientID=1")
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
            rooms: [
              {
                RoomID: "1",
                RoomName: "Blue Bell cottage couple AC",
                Description:
                  "An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32\u201d LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.",
                PricePerNight: "3190",
                RoomsClientID: "1",
                RoomPhotos:
                  "http://riverorchidresort.com/img/landing%20page%20img/mango.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http://riverorchidresort.com/img/room%20img/Mango%20cottage%20Nabar%201%20bathrum.jpg",
                RoomsWithBreakFast: "3520",
                RoomsWithAllMeals: "4950",
              },
              {
                RoomID: "2",
                RoomName: "Blue Bell cottage couple AC",
                Description:
                  "An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32\u201dLED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.",
                PricePerNight: "3520",
                RoomsClientID: "1",
                RoomPhotos:
                  "http://riverorchidresort.com/img/room%20img/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg, http://riverorchidresort.com/img/landing%20page%20img/bluebell%20couple.jpg",
                RoomsWithBreakFast: "4400",
                RoomsWithAllMeals: "5500",
              },
            ],
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

  useEffect(() => {
    console.log("finaldata: ", finaldata);
  }, [finaldata]);

  // useEffect(() => {
  //   console.log(finaldata);

  //   let withbreakfastExtrabed;

  //   // switch (true) {
  //   //   case finaldata?.Adults > 6:
  //   //     withbreakfastExtrabed = 5;
  //   //     break;
  //   //   case finaldata?.Adults > 5:
  //   //     withbreakfastExtrabed = 4;
  //   //     break;
  //   //   case finaldata?.Adults > 4:
  //   //     withbreakfastExtrabed = 3;
  //   //     break;
  //   //   case finaldata?.Adults > 3:
  //   //     withbreakfastExtrabed = 2;
  //   //     break;
  //   //   case finaldata?.Adults > 2:
  //   //     withbreakfastExtrabed = 1;
  //   //     break;
  //   //   default:
  //   //     withbreakfastExtrabed = 0;
  //   // }
  //   // setWithBreakFastExtraBed(withbreakfastExtrabed);

  //  // let withbreakfastExtrabedCharg;

  //   // switch (true) {
  //   //   case finaldata?.Adults > 6:
  //   //     withbreakfastExtrabedCharg = 9000;
  //   //     break;
  //   //   case finaldata?.Adults > 5:
  //   //     withbreakfastExtrabedCharg = 7200;
  //   //     break;
  //   //   case finaldata?.Adults > 4:
  //   //     withbreakfastExtrabedCharg = 5400;
  //   //     break;
  //   //   case finaldata?.Adults > 3:
  //   //     withbreakfastExtrabedCharg = 3600;
  //   //     break;
  //   //   case finaldata?.Adults > 2:
  //   //     withbreakfastExtrabedCharg = 1800;
  //   //     break;
  //   //   default:
  //   //     withbreakfastExtrabedCharg = 0;
  //   // }
  //      // setWithBreakFastExtraBedCharg(withbreakfastExtrabedCharg);

  // ///  setResult(withbreakfastExtrabedCharg + Number(finaldata?.price));
  // }, [finaldata]);
  // debugger;
  console.log(checkIn, "checkIn");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-9/12 bg-gray-200 p-4">
          <Accordion type="single" collapsible="true" value={activeItem}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Search For Availability</AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-wrap flex-col lg:flex-row">
                      <div className="w-1/3 p-4">
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
                                      "w-[280px] justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select Check In Date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    className={field.value && "hidden"}
                                    mode="single"
                                    selected={() => {
                                      field.value;
                                      const disableDate = new Date(
                                        field.value
                                      ).setDate(
                                        new Date(field.value).getDate() + 1
                                      );
                                      setCheckIn(disableDate);
                                    }}
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
                      <div className="w-1/3 p-4">
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
                                      "w-[280px] justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select Check Out Date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    className={field.value && "hidden"}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date(checkIn)
                                    }
                                    minDate={new Date(checkIn)} // Set the minimum date to the current date
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="Rooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rooms</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="sm:w-60 md:w-70 lg:w-100 xl:w-120">
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
                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="Adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adults</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="sm:w-60 md:w-70 lg:w-100 xl:w-120">
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
                      <div className="w-1/3 p-4">
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
                                  <SelectTrigger className="sm:w-60 md:w-70 lg:w-100 xl:w-120">
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
                          <div key={index} className="w-1/3 p-4">
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
                                      <SelectTrigger className="sm:w-60 md:w-70 lg:w-100 xl:w-120">
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
                      type="submit"
                      onClick={() =>
                        form.control._formValues?.CheckIn &&
                        form.control._formValues?.CheckOut &&
                        handleSearch("item-2")
                      }
                    >
                      Search
                    </Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Available Rooms</AccordionTrigger>
              <AccordionContent>
                {roomdata
                  ? roomdata?.map((item, i) => (
                      <Availability
                        room={item}
                        key={i}
                        setFinaldata={handleSetFinalData}
                        handleSearch={() => handleSearch("item-4")}
                      />
                    ))
                  : "All the rooms for these dates are booked, please select different dates."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Your Details</AccordionTrigger>
              <AccordionContent>
                <Details
                  setReview={setReview}
                  setFinaldata={handleSetFinalData}
                  finaldata={finaldata}
                  handleSearch={() => handleSearch("item-5")}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Review Your Booking</AccordionTrigger>
              <AccordionContent>
                <div>
                  <h2 className="text-center font-bold">Your Details</h2>
                  <ul className="flex flex-wrap flex-col lg:flex-row">
                    <li className="p-5 lg:w-1/2">Name: {review?.UserName}</li>
                    <li className="p-5 lg: w-1/2">
                      Mobile: {review?.UserPhone}
                    </li>
                    <li className="p-5 lg: w-1/2">
                      Email: {review?.UserEmail}
                    </li>
                    <li className="p-5 lg: w-1/2">
                      Address: {review?.UserAddress}
                    </li>
                    <li className="p-5 lg: w-1/2">
                      Special Request: {review?.SpecialRequest}
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-center font-bold">Booking Details</h2>
                  <ul className="flex flex-wrap flex-col lg:flex-row">
                    <li className="p-5 lg:w-1/2">
                      Check In Date:{" "}
                      {new Date(review?.CheckInDate)?.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </li>
                    <li className="p-5 lg: w-1/2">
                      Check Out Date:{" "}
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
                    <li className="p-5 lg: w-1/2">
                      Room Type: {review?.BookingRoomType}
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
                        <TableCell className="font-medium border-r">
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
                  <h2 className="text-center font-bold">Summary</h2>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Sub Total</TableHead>
                        <TableHead>
                          {currency}
                          {review?.TotalPrice}/-
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Grand Total
                        </TableCell>
                        <TableCell>
                          {currency}
                          {review?.TotalPrice}/-
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="flex">
                  <Button className="ml-5" onClick={refreshPage}>
                    Reset
                  </Button>
                  <Button className="ml-5">Pay Now</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:w-3/12 bg-gray-300 p-4">
          <Accordion type="multiple" collapsible="true">
            <AccordionItem value="item-1">
              <AccordionTrigger>Hotel Details</AccordionTrigger>
              <AccordionContent>
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
            <AccordionItem value="item-2">
              <AccordionTrigger>Cancellation Policy</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc">
                  {data?.policies?.CancellationPolicies?.map((elem, ind) => (
                    <li key={ind}> {elem}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Check In/Out Policy</AccordionTrigger>
              <AccordionContent>
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
