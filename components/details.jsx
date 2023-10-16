"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
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
    async function sendData() {
      let tempSendData = await fetch("//192.168.1.22/index.php", {
        method: "POST",
        body: JSON.stringify({ ...priviosdata, ...values }),
      })
        .then((response) => response.text())
        .then((json) => json)
        .catch((error) => {
          return "error";
        });
      if (tempSendData === "success") {
        alert("submited");
        setuseDetailsIsSuccess(true);
      } else if (tempSendData === "alreadyExists") {
        alert("exist");
      } else {
        console.log("php error");
      }
    }

    sendData();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-wrap"
      >
        <div className="md:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserName"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Name</FormLabel>
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
        </div>{" "}
        <div className="md:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Contact Number"
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>{" "}
        <div className="md:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:w-1/3 w-[100%] p-2 mt-3">
          <FormField
            control={form.control}
            name="UserAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
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
                    <FormLabel>Company Name</FormLabel>
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
                    <FormLabel>Company GST</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Company GST"
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
            <div className="md:w-1/3 sm:w-full p-2 mt-3">
              <FormField
                control={form.control}
                name="CompanyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
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
        <div className="w-full mt-3">
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
        <Button type="submit" onClick={props.handleSearch}>
          Confirm
        </Button>
      </form>
    </Form>
  );
}
