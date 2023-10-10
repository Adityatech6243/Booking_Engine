"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { DatePickerDemo } from "@/components/datepicker";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Availability } from "@/components/availability";
import { Details } from "@/components/details";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState({});
  const [roomsData, setRoomsData] = useState();
  const [isOpen, setisOpen] = useState();
  const [clientData, setClientsData] = useState();

  const receiveDataFromChild = (data) => {
    setisOpen(data);
  };

  useEffect(() => {
    setRoomsData(data.client);
    setClientsData(data.rooms);
  }, [data]);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    childrens: z.string({
      required_error: "Please select number of children",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const on = () => {
    console.log(form.setValue("childrens", "light"));
  };
  const [childrenValue, setChildrenValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      let tempFetchedsData = await fetch("//192.168.1.22/index.php?ClientID=1")
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((error) => {
          // setData({"client":{"ClientID":"1","ClientBusinessName":"River Orchid Resort","ClientName":"Sitaram Karande","ClientEmail":"lk","ClientPhone":"hh","ClientAddress":"Tapola"},"rooms":[{"RoomID":"1","RoomName":"Blue Bell cottage couple AC","Description":"An exclusive cottage with additional private lakeside sit out of 430sqft+ area under old mango tree, the cottage is equipped with One large kingsize bed, blackout curtains, 32\u201d LED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.","PricePerNight":"3190","RoomsClientID":"1","RoomPhotos":"http:\/\/riverorchidresort.com\/img\/landing%20page%20img\/mango.jpg, http:\/\/riverorchidresort.com\/img\/room%20img\/Mango%20cottage%20Nabar%201%20private%20seat%20out.jpg, http:\/\/riverorchidresort.com\/img\/room%20img\/Mango%20cottage%20Nabar%201%20bathrum.jpg"},{"RoomID":"2","RoomName":"Blue Bell cottage couple AC","Description":"An exclusive cottage with private sit out under mango tree facing lawn n lake, the cottage is equipped with one kingsize bed sleeping accommodation and one sofa cum bed, blackout curtains, wardrobe, 32\u201dLED TV with Tata sky connection, intercom facility, bathroom with partial open to sky area.","PricePerNight":"3520","RoomsClientID":"1","RoomPhotos":"http:\/\/riverorchidresort.com\/img\/room%20img\/Blue%20Bell%20cottage%20Nabar%202%20bathrum%20open%20to%20sky.jpg, http:\/\/riverorchidresort.com\/img\/landing%20page%20img\/bluebell%20couple.jpg"}]});
          return "error";
        });
      // if (tempActivitiesData === "error") {
      //   setData(tempFetchedsData);
      // } else {
      //   console.log("php error");
      // }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);

  //  sendDataToServer = () => {
  //    const serverUrl = "//192.168.1.22/index.php";
  //    fetch(serverUrl, {
  //      method: "POST",
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify(data),
  //    })
  //      .then((response) => {
  //        if (!response.ok) {
  //          throw new Error("Network response was not ok");
  //        }
  //        return response.json();
  //      })
  //      .then((responseData) => {
  //        console.log("Server Response:", responseData);
  //      })
  //      .catch((error) => {
  //        console.error("Error:", error);
  //      });
  //  };
  function onSubmit(values) {
    console.log(values);
  }
  // const handleSubmit = (event,data) => {
  //   event.preventDefault();
  //   // data.formName = formName;
  //   // async function sendData() {
  //   //   let tempSendData = await fetch("//192.168.1.22/index.php", {
  //   //     method: "POST",
  //   //     body: JSON.stringify(data),
  //   //   })
  //   //     .then((response) => response.text())
  //   //     .then((json) => json)
  //   //     .catch((error) => {
  //   //       return "error";
  //   //     });
  //   //   if (tempSendData === "success") {
  //   //     if (data.formName === "facility") {
  //   //       const arr = [...facilityData];
  //   //       arr[index] = { ...arr[index], show: true };
  //   //       if (arr[index].delete) {
  //   //         arr.splice(index, 1);
  //   //       }
  //   //       setFacilityData(arr);
  //   //     }

  //   //   } else {
  //   //     console.log("php error");
  //   //   }
  //   // }

  // sendDataToServer = () => {
  //   const serverUrl = "//192.168.1.22/index.php";
  //   fetch(serverUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       console.log("Server Response:", responseData);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  //   sendDataToServer();
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-9/12 bg-gray-200 p-4">
          {" "}
          <Accordion type="single" collapsible="true" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Search For Availability</AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-wrap">
                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="checkin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Check In*</FormLabel>
                              <FormControl>
                                <DatePickerDemo />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="checkout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Check Out*</FormLabel>
                              <FormControl>
                                <DatePickerDemo />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="rooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rooms</FormLabel>
                              <FormControl>
                                <Select>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="1" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="one">1</SelectItem>
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
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adults</FormLabel>
                              <FormControl>
                                <Select>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="1" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="one">1</SelectItem>
                                    <SelectItem value="two">2</SelectItem>
                                    <SelectItem value="three">3</SelectItem>
                                    <SelectItem value="four">4</SelectItem>
                                    <SelectItem value="five">5</SelectItem>
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
                          name="childrens"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Childrens</FormLabel>
                              <FormControl>
                                <Select
                                  value={childrenValue}
                                  defaultValue={form.childrens}
                                  onValueChange={setChildrenValue}
                                >
                                  <SelectTrigger className="w-[180px]">
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
                      {parseInt(childrenValue) > 0 &&
                        Array.from({ length: parseInt(childrenValue) }).map(
                          (_, index) => (
                            <div key={index} className="w-1/3 p-4">
                              <FormField
                                control={form.control}
                                name={`childAge[${index}]`} // Use an array to differentiate between child ages
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Child {index + 1} age</FormLabel>
                                    <FormControl>
                                      <Select>
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="0" />
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
                          )
                        )}
                    </div>

                    <Button type="submit">Search</Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Available Rooms</AccordionTrigger>
              <AccordionContent>
                {data?.rooms?.map((iteam, i) => (
                  <Availability room={iteam} key={i} />
                ))}
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-3">
              <AccordionTrigger>Available Enhance Your Stay</AccordionTrigger>
              <AccordionContent>
                <Button type="submit">Continue</Button>
              </AccordionContent>
            </AccordionItem> */}
            <AccordionItem value="item-4">
              <AccordionTrigger>Your Details</AccordionTrigger>
              <AccordionContent>
                <Details sendDataToParent={receiveDataFromChild} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Review Your Booking</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex">
            <Button className="ml-5">Reset</Button>
            <Button className="ml-5">Pay Now</Button>
          </div>
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
                <ul>
                  <li>
                    • If cancelled before 15 days of Check In date refundable
                    amount would Be 100% of total billing.
                  </li>
                  <li>
                    • If cancelled before 15 days of Check In date refundable
                    amount would Be 100% of total billing.
                  </li>
                  <li>
                    • If cancelled before 6 days of Check In date booking will
                    Be Non Refundable.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Check In/Out Policy</AccordionTrigger>
              <AccordionContent>
                <p className="mb-1">
                  <b>Check In Time : </b>
                  <span>12:00PM</span>
                </p>
                <p className="mb-1">
                  <b>Check Out Time:</b>
                  <span>10:00PM </span>
                </p>
                <p className="mb-1">
                  <b>Late Check Out Allowed: </b>
                  <span>Subject To Availability</span>
                </p>{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
