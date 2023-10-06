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
export default function Home() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div class="flex flex-col lg:flex-row w-full">
        <div class="lg:w-9/12 bg-gray-200 p-4">
          {" "}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Search For Availability</AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="username"
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
                    <FormField
                      control={form.control}
                      name="username"
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
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rooms</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="1" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">1</SelectItem>
                                <SelectItem value="dark">2</SelectItem>
                                <SelectItem value="system">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room 1(Adults)</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="1" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">1</SelectItem>
                                <SelectItem value="dark">2</SelectItem>
                                <SelectItem value="system">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>(Childrens)</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="0" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">1</SelectItem>
                                <SelectItem value="dark">2</SelectItem>
                                <SelectItem value="system">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Child age</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="0" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">1</SelectItem>
                                <SelectItem value="dark">2</SelectItem>
                                <SelectItem value="system">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
            <AccordionItem value="item-3">
              <AccordionTrigger>Available Enhance Your Stay</AccordionTrigger>
              <AccordionContent>
                <Button type="submit">Continue</Button>
              </AccordionContent>
            </AccordionItem>
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
          <div>
            <Button>Reset</Button>
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </div>
        <div class="lg:w-3/12 bg-gray-300 p-4">
          <Accordion type="single" collapsible>
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
