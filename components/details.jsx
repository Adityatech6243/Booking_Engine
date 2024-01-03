"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { basepath } from "@/lib/constant"
const formSchema = z.object({
  UserName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  UserEmail: z.string().email(),
  UserPhone: z.string(),
  UserAddress: z.string(),
  IsGST: z.string(),
  CompanyName: z.string(),
  CompanyGST: z.string(),
  CompanyAddress: z.string(),
  SpecialRequest: z.string(),
});

export function Details(props) {
  const [useDetailsIsSuccess, setuseDetailsIsSuccess] = useState(false);
  const [priviosdata, setpriviosdata] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberRegex = /^[0-9]{10}$/; // This example assumes a 10-digit number
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Define a regular expression for a valid phone number
    // You can customize this regex to match the phone number format you need

    setIsValidPhoneNumber(phoneNumberRegex.test(value));
  };
  const [gstNumber, setGstNumber] = useState("");
  const [isValidGstNumber, setIsValidGstNumber] = useState(true);
  const gstNumberRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}/; // This example assumes a 10-digit number
  const handleGstNumberChange = (e) => {
    const value = e.target.value;
    setGstNumber(value);

    // Define a regular expression for a valid phone number
    // You can customize this regex to match the phone number format you need

    setIsValidGstNumber(gstNumberRegex.test(value));
  };
  const [emailId, setEmailId] = useState("");
  const [isValidEmailId, setIsValidEmailId] = useState(true);
  const emailIdRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; // This example assumes a 10-digit number
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailId(value);

    // Define a regular expression for a valid phone number
    // You can customize this regex to match the phone number format you need

    setEmailId(emailIdRegex.test(value));
  };

  React.useEffect(() => {
    setpriviosdata(props?.finaldata);
  }, [props.finaldata]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      UserName: "",
      UserEmail: "",
      UserPhone: "",
      UserAddress: "",
      IsGST: "no",
      CompanyName: "",
      CompanyGST: "",
      CompanyAddress: "",
      SpecialRequest: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    props.setFinaldata(values);
    values.ClientID = "1";
    values.YourDetails = "true";
    async function sendData() {
      let tempSendData = await fetch(`//${basepath}/index.php`, {
        method: "POST",
        body: JSON.stringify({ ...priviosdata, ...values }),
      })
        .then((response) => response.text())
        .then((json) => json)
        .catch((error) => {
          return "{}";
        });
        try {
          const parsedData = JSON.parse(tempSendData);
          props.setReview(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle the error, e.g., display an error message or fallback data
        }
      // props.setReview(JSON.parse(tempSendData));
    }

    sendData();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-wrap"
      >
        <div className="sm:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserName"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>
                  Name<sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Guest / Business Name"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact Number<sup className="text-red-500">*</sup>
                </FormLabel>

                <FormControl>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter Your Contact Number"
                    {...field}
                    required
                    pattern="\d{10}"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    onChange={handleEmailChange}
                    placeholder="Enter Your Email"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address<sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Address" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" md:w-1/3 sm:w-full w-1/3  p-2 mt-3">
          <FormField
            control={form.control}
            name="IsGST"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have GST</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col lg:flex-row w-full mt-3">
          {form.control._formValues.IsGST === "yes" && (
            <div className="md:w-1/3 sm:w-full p-2 mt-3">
              <FormField
                control={form.control}
                name="CompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Name<sup className="text-red-500">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Company Name"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.control._formValues.IsGST === "yes" && (
            <div className="md:w-1/3 sm:w-full  p-2 mt-3">
              <FormField
                control={form.control}
                name="CompanyGST"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company GST<sup className="text-red-500">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        onChange={handleGstNumberChange}
                        placeholder="Enter Your Company GST"
                        {...field}
                        required
                        pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.control._formValues.IsGST === "yes" && (
            <div className="md:w-1/3 sm:w-full p-2 mt-3">
              <FormField
                control={form.control}
                name="CompanyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company Address<sup className="text-red-500">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" Enter Your Company Address"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="w-full p-2 mt-3">
          <FormField
            control={form.control}
            name="SpecialRequest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Request</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Let Us Know Your Special Request If Any."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="bg-[#9f1f63] text-white hover:bg-[#9f1f63] mt-4 ml-2"
          type="submit"
          onClick={() => {
            if (
              form.control._formValues?.UserName &&
              phoneNumberRegex.test(form.control._formValues?.UserPhone) &&
              emailIdRegex.test(form.control._formValues?.UserEmail) &&
              form.control._formValues?.UserAddress
            ) {
              if (form.control._formValues.IsGST === "yes") {
                if (
                  form.control._formValues?.CompanyName &&
                  gstNumberRegex.test(form.control._formValues?.CompanyGST) &&
                  form.control._formValues?.CompanyAddress
                ) {
                  props.handleSearch();
                  props.enableEdit4();
                }
              } else if (form.control._formValues.IsGST === "no") {
                props.handleSearch();
                props.enableEdit4();
              }
            }
          }}
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
}
