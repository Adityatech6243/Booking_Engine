"use client";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
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
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  const [UserEmail, setUserEmail] = useState("");
  const [UserPass, setUserPass] = useState("");

  const handleToggle = () => {
    setShowDiv(!showDiv);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
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
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("test")
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img src="/img/Logo.png" width="170" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                  <tr>
                    <td>Mango Cottage Room AC</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date1
                      </span>
                      ,
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date2
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">Lilium Twin Room Non AC</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date1
                      </span>
                      ,
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date2
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">Jasminum cottage family Non AC</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date1
                      </span>
                      ,
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date2
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">Blue Bell cottage family AC</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date1
                      </span>
                      ,
                      <span
                        style={{
                          backgroundColor: "green",
                          padding: "2px",
                          color: "white",
                        }}
                      >
                        Date2
                      </span>
                    </td>
                  </tr>
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
                          onChange={handleSelectChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Option 1">Select Room</option>
                          <option value="Option 2">
                            Mango Cottage Room AC
                          </option>
                          <option value="Option 3">
                            Mango Cottage Room AC
                          </option>
                          <option value="Option 4">
                            Jasminum cottage family Non AC
                          </option>
                          <option value="Option 5">
                            Blue Bell cottage family AC
                          </option>
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
                        <button type="submit" className="btn btn-primary">
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
                    onSubmit={handleSubmit}
                  >
                    <div className="md:w-full">
                      <label htmlFor="option" className="text-gray-600 block">
                        <b>Select Room:</b>
                      </label>
                      <select
                        id="option"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Option 1">Select Room</option>
                        <option value="Option 2">Mango Cottage Room AC</option>
                        <option value="Option 3">Mango Cottage Room AC</option>
                        <option value="Option 4">
                          Jasminum cottage family Non AC
                        </option>
                        <option value="Option 5">
                          Blue Bell cottage family AC
                        </option>
                      </select>
                    </div>
                    <div className="md:w-full mt-0">
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
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
                        </form>
                      </Form>
                    </div>
                    <div className="md:w-full mt-0">
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
                    <div className="md:justify-center flex items-center">
                      <button type="submit" className="btn btn-primary">
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
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleLogin}
              >
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
    // <Container fluid className="align-item-center">
    //   <div>
    //     {/* Conditional rendering based on login status */}
    //     {isLoggedIn ? (
    //       // Content for logged-in user
    //       <section>
    //         <table className="table-bordered p-2 w-full">
    //           <thead>
    //             <tr>
    //               <th>Room Category</th>
    //               <th scope="col">Bookings</th>
    //             </tr>
    //           </thead>
    //           <tbody className="p-2">
    //             <tr>
    //               <td>Mango Cottage Room AC</td>
    //               <td>
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date1
    //                 </span>
    //                 ,
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date2
    //                 </span>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td scope="row">Lilium Twin Room Non AC</td>
    //               <td>
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date1
    //                 </span>
    //                 ,
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date2
    //                 </span>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td scope="row">Jasminum cottage family Non AC</td>
    //               <td>
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date1
    //                 </span>
    //                 ,
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date2
    //                 </span>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td scope="row">Blue Bell cottage family AC</td>
    //               <td>
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date1
    //                 </span>
    //                 ,
    //                 <span
    //                   style={{
    //                     backgroundColor: "green",
    //                     padding: "2px",
    //                     color: "white",
    //                   }}
    //                 >
    //                   Date2
    //                 </span>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         <div className="p-2">
    //           <button
    //             onClick={handleToggle}
    //             type="submit"
    //             className="btn btn-primary"
    //           >
    //             Edit Prices
    //           </button>{" "}
    //           {showDiv && (
    //             <div>
    //               <h3 className="text-center">Edit Prices</h3>
    //               <form
    //                 className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:w-full"
    //                 onSubmit={handleSubmit}
    //               >
    //                 <div className="md:w-full">
    //                   <label htmlFor="option" className="text-gray-600 block">
    //                     <b>Select Room:</b>
    //                   </label>
    //                   <select
    //                     id="option"
    //                     value={selectedOption}
    //                     onChange={handleSelectChange}
    //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    //                   >
    //                     <option value="Option 1">Select Room</option>
    //                     <option value="Option 2">Mango Cottage Room AC</option>
    //                     <option value="Option 3">Mango Cottage Room AC</option>
    //                     <option value="Option 4">
    //                       Jasminum cottage family Non AC
    //                     </option>
    //                     <option value="Option 5">
    //                       Blue Bell cottage family AC
    //                     </option>
    //                   </select>
    //                 </div>
    //                 <div className="md:w-full mt-0">
    //                   <label htmlFor="input1" className="text-gray-600 block">
    //                     <b>With Breakfast:</b>
    //                   </label>
    //                   <input
    //                     type="text"
    //                     id="input1"
    //                     value={input1}
    //                     onChange={handleInput1Change}
    //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    //                     placeholder="Enter Price With Breakfast Here"
    //                     min="0"
    //                     pattern="^[0-9]+$"
    //                   />
    //                 </div>
    //                 <div className="md:w-full mt-0">
    //                   <label htmlFor="input2" className="text-gray-600 block">
    //                     <b>With All Meals:</b>
    //                   </label>
    //                   <input
    //                     type="text"
    //                     id="input2"
    //                     value={input2}
    //                     onChange={handleInput2Change}
    //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    //                     placeholder="Enter Price With All Meal Here"
    //                     min="0"
    //                     pattern="^[0-9]+$"
    //                   />
    //                 </div>
    //                 <div className="md:justify-center flex items-center mt-4">
    //                   <button type="submit" className="btn btn-primary">
    //                     Save
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           )}
    //         </div>
    //         <div>
    //           <h3 className="text-center">Add Bookings</h3>
    //           <Form {...form}>
    //             <form
    //               className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:w-full"
    //               onSubmit={handleSubmit}
    //             >
    //               <div className="md:w-full">
    //                 <label htmlFor="option" className="text-gray-600 block">
    //                   <b>Select Room:</b>
    //                 </label>
    //                 <select
    //                   id="option"
    //                   value={selectedOption}
    //                   onChange={handleSelectChange}
    //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    //                 >
    //                   <option value="Option 1">Select Room</option>
    //                   <option value="Option 2">Mango Cottage Room AC</option>
    //                   <option value="Option 3">Mango Cottage Room AC</option>
    //                   <option value="Option 4">
    //                     Jasminum cottage family Non AC
    //                   </option>
    //                   <option value="Option 5">
    //                     Blue Bell cottage family AC
    //                   </option>
    //                 </select>
    //               </div>
    //               <div className="md:w-full mt-0">
    //                 <Form {...form}>
    //                   <form
    //                     onSubmit={form.handleSubmit(onSubmit)}
    //                     className="space-y-8"
    //                   >
    //                     <FormField
    //                       control={form.control}
    //                       name="CheckIn"
    //                       render={({ field }) => (
    //                         <FormItem className="flex flex-col">
    //                           <FormLabel>
    //                             Check In Date
    //                             <sup className="text-red-500">*</sup>
    //                           </FormLabel>
    //                           <Popover>
    //                             <PopoverTrigger asChild>
    //                               <Button
    //                                 variant={"outline"}
    //                                 className={cn(
    //                                   "justify-start text-left font-normal ",
    //                                   !field.value && "text-muted-foreground"
    //                                 )}
    //                               >
    //                                 {field.value ? (
    //                                   format(field.value, "PPP")
    //                                 ) : (
    //                                   <span>Select Check In Date</span>
    //                                 )}
    //                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    //                               </Button>
    //                             </PopoverTrigger>
    //                             <PopoverContent className="w-auto p-0">
    //                               <Calendar
    //                                 selected={field.value}
    //                                 mode="single"
    //                                 onSelect={field.onChange}
    //                                 disabled={(date) => date < new Date()}
    //                                 minDate={new Date()} // Set the minimum date to the current date
    //                                 initialFocus
    //                               />
    //                             </PopoverContent>
    //                           </Popover>
    //                         </FormItem>
    //                       )}
    //                     />
    //                   </form>
    //                 </Form>
    //               </div>
    //               <div className="md:w-full mt-0">
    //                 <FormField
    //                   control={form.control}
    //                   name="CheckOut"
    //                   render={({ field }) => (
    //                     <FormItem className="flex flex-col">
    //                       <FormLabel>
    //                         Check Out Date
    //                         <sup className="text-red-500">*</sup>
    //                       </FormLabel>
    //                       <Popover>
    //                         <PopoverTrigger asChild>
    //                           <Button
    //                             variant={"outline"}
    //                             className={cn(
    //                               "justify-start text-left font-normal",
    //                               !field.value && "text-muted-foreground"
    //                             )}
    //                           >
    //                             {field.value ? (
    //                               format(field.value, "PPP")
    //                             ) : (
    //                               <span>Select Check Out Date</span>
    //                             )}
    //                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    //                           </Button>
    //                         </PopoverTrigger>
    //                         <PopoverContent className="w-auto p-0">
    //                           <Calendar
    //                             mode="single"
    //                             selected={field.value}
    //                             onSelect={field.onChange}
    //                             disabled={(date) =>
    //                               date <
    //                               new Date(
    //                                 form.control._formValues?.CheckIn
    //                               ).setDate(
    //                                 new Date(
    //                                   form.control._formValues?.CheckIn
    //                                 ).getDate() + 1
    //                               )
    //                             }
    //                             minDate={new Date(
    //                               form.control._formValues?.CheckIn
    //                             ).setDate(
    //                               new Date(
    //                                 form.control._formValues?.CheckIn
    //                               ).getDate() + 1
    //                             )} // Set the minimum date to the current date
    //                             initialFocus
    //                           />
    //                         </PopoverContent>
    //                       </Popover>
    //                     </FormItem>
    //                   )}
    //                 />
    //               </div>
    //               <div className="md:justify-center flex items-center">
    //                 <button type="submit" className="btn btn-primary">
    //                   Book
    //                 </button>
    //               </div>
    //             </form>
    //           </Form>
    //         </div>{" "}
    //         <button onClick={handleLogout}>Logout</button>
    //       </section>
    //     ) : (
    //       // Login form
    //       <section className="bg-gray-50 dark:bg-gray-900">
    //         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //           <a
    //             href="#"
    //             className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    //           >
    //             <img src="/img/Logo.png" width="170" alt="logo" />
    //           </a>
    //           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //                 Sign in to your account
    //               </h1>
    //               <form className="space-y-4 md:space-y-6" action="#">
    //                 <div>
    //                   <label
    //                     htmlFor="email"
    //                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                   >
    //                     Your email
    //                   </label>
    //                   <input
    //                     type="email"
    //                     name="email"
    //                     id="email"
    //                     value={UserEmail}
    //                     onChange={(e) => setUserEmail(e.target.value)}
    //                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                     placeholder="name@company.com"
    //                     required
    //                   />
    //                 </div>
    //                 <div>
    //                   <label
    //                     htmlFor="password"
    //                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //                   >
    //                     Password
    //                   </label>
    //                   <input
    //                     type="password"
    //                     name="password"
    //                     id="password"
    //                     value={UserPass}
    //                     onChange={(e) => setUserPass(e.target.value)}
    //                     placeholder="••••••••"
    //                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                     required
    //                   />
    //                 </div>
    //                 <div className="flex items-center justify-between">
    //                   <div className="flex items-start">
    //                     <div className="flex items-center h-5">
    //                       <input
    //                         id="remember"
    //                         aria-describedby="remember"
    //                         type="checkbox"
    //                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
    //                         required
    //                       />
    //                     </div>
    //                     <div className="ml-3 text-sm">
    //                       <label
    //                         htmlFor="remember"
    //                         className="text-gray-500 dark:text-gray-300"
    //                       >
    //                         Remember me
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <a
    //                     href="#"
    //                     className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
    //                   >
    //                     Forgot password?
    //                   </a>
    //                 </div>
    //                 <button
    //                   type="submit"
    //                   className="flex items-center"
    //                   style={{
    //                     textTransform: "uppercase",
    //                     textAlign: "center",
    //                     color: "white",
    //                     padding: "0.5rem 1rem",
    //                     backgroundColor: "#cf549e",
    //                   }}
    //                   onClick={handleLogin}
    //                 >
    //                   Sign in
    //                 </button>
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //     )}
    //   </div>
    // </Container>
  );
}

export default Adminpanel;
