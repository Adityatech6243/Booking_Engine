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
  const [clientData, setClientsData] = useState();

  useEffect(() => {
    setRoomsData(data.client);
    setClientsData(data.rooms);
    console.log(roomsData);
    console.log(clientData);
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
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const on = () => {
    console.log(form.setValue("childrens", "light"));
  };
  const [childrenValue, setChildrenValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      let tempFetchedsData = await fetch("//192.168.1.19/index.php?ClientID=1")
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((error) => {
          return "error";
        });
      if (tempActivitiesData === "error") {
        setData(tempFetchedsData);
      } else {
        console.log("php error");
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24">
      <div class="flex flex-col lg:flex-row w-full">
        <div class="lg:w-9/12 bg-gray-200 p-4">
          {" "}
          <Accordion type="multiple" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Search For Availability</AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div class="flex flex-wrap">
                      <div class="w-1/3 p-4">
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
                      <div class="w-1/3 p-4">
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
                      <div class="w-1/3 p-4">
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
                      <div class="w-1/3 p-4">
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
                                    <SelectItem value="three">3 </SelectItem>{" "}
                                    <SelectItem value="two">4</SelectItem>
                                    <SelectItem value="three">5</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div class="w-1/3 p-4">
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
                            <div key={index} class="w-1/3 p-4">
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
                <Availability />
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
                <Details />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Review Your Booking</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div class="flex">
            <Button className="ml-5">Reset</Button>
            <Button className="ml-5">Submit</Button>
          </div>
        </div>
        <div class="lg:w-3/12 bg-gray-300 p-4">
          <Accordion type="multiple" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Hotel Details</AccordionTrigger>
              <AccordionContent>
                <p class="mb-1">
                  <b>Hotel Name: </b>
                  <br />
                  <span>River Orchid Resort</span>
                </p>
                <p class="mb-1">
                  <b>Email: </b>
                  <br />
                  <span>tapolariverorchidresort@gmail.com</span>
                </p>
                <p class="mb-1">
                  <b>Mobile: </b>
                  <br />
                  <span>+91-9226271237</span>
                </p>
                <p class="mb-1">
                  <b>Phone: </b>
                  <br />
                  <span>+91-9405751313</span>
                </p>
                <p class="mb-1">
                  <b>Addres: </b>
                  <br />
                  <span>Pali t ategaon Maharashtra 412806</span>
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
                <p class="mb-1">
                  <b>Check In Time : </b>
                  <span>12:00PM</span>
                </p>
                <p class="mb-1">
                  <b>Check Out Time:</b>
                  <span>10:00PM </span>
                </p>
                <p class="mb-1">
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
