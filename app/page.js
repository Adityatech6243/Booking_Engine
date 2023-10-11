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
import {
  Table,
  TableBody,
  TableCaption,
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
  const [data, setData] = useState({});

  const [childrensCount, setChildrensCount] = useState(0);

    
  const [finaldata, setFinalData] = useState({});
      const handleSetFinalData = (value) => {
        const arr= {...value}
                setFinalData(value);


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
      fetch("//192.168.1.22/index.php?ClientID=1")
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((error) => {
          setData({
            client: {
              ClientID: "1",
              ClientBusinessName: "River Orchid Resort",
              ClientName: "Sitaram Karande",
              ClientEmail: "lk",
              ClientPhone: "hh",
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
              },
            ],
          });
          return "error";
        });
    }
    fetchData();
  }, []);

  function onSubmit(values) {
    console.log(values);
  }

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
                          name="CheckIn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Check In*</FormLabel>
                              <FormControl>
                                <DatePickerDemo
                                  name="CheckIn"
                                  form={form}
                                  fields={field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-1/3 p-4">
                        <FormField
                          control={form.control}
                          name="CheckOut"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Check Out*</FormLabel>
                              <FormControl>
                                <DatePickerDemo
                                  name="CheckOut"
                                  form={form}
                                  fields={field}
                                />
                              </FormControl>
                              <FormMessage />
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
                                  <SelectTrigger className="w-[180px]">
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
                                  <SelectTrigger className="w-[180px]">
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
                        ))}
                    </div>

                    <Button type="submit">Search</Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Available Rooms</AccordionTrigger>
              <AccordionContent>
                {data &&
                  data?.rooms?.map((iteam, i) => (
                    <Availability room={iteam} key={i} />
                  ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Your Details</AccordionTrigger>
              <AccordionContent>
                <Details setFinaldata={handleSetFinalData} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Review Your Booking</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>{finaldata.UserName}</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead className="text-right">
                        {finaldata.UserPhone}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>{finaldata.UserEmail}</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell className="text-right">
                        {finaldata.UserAddress}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Special Request
                      </TableCell>
                      <TableCell>{finaldata.SpecialRequest}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Check In Date</TableHead>
                      <TableHead>12-oct-2023(12:00 PM)</TableHead>
                      <TableHead>Check Out Date</TableHead>
                      <TableHead className="text-right">
                        12-oct-2023(12:00 PM)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">No. Rooms</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>MealPlan</TableCell>
                      <TableCell className="text-right">
                        Room Only(EP)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Room</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Child</TableHead>
                      <TableHead>Child Age</TableHead>
                      <TableHead>Child Cost</TableHead>{" "}
                      <TableHead>Nights</TableHead>
                      <TableHead>Extrabed</TableHead>{" "}
                      <TableHead>Extrabed Cost</TableHead>
                      <TableHead>Room Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Jasminum cottage couple non ac
                      </TableCell>
                      <TableCell>2 Adult(s)</TableCell>
                      <TableCell>No Childs</TableCell>
                      <TableCell>No Childs</TableCell>

                      <TableCell className="text-right">0/-</TableCell>
                      <TableCell className="font-medium">1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0/-</TableCell>
                      <TableCell>3300/-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Sub Total</TableHead>
                      <TableHead>3500</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Grand Total</TableCell>
                      <TableCell>3500</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                <ul className="list-inside list-disc">
                  {data?.policies?.CancellationPolicies?.map((elem, ind) => (
                    <li key={ind}> {elem}</li>
                  ))}

                  {/* <li>
                    • If cancelled before 15 days of Check In date refundable
                    amount would Be 100% of total billing.
                  </li> */}
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
                </p>{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
