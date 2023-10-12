"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
        body: JSON.stringify(values),
      })
        .then((response) => response.text())
        .then((json) => json)
        .catch((error) => {
          return "error";
        });
      if (tempSendData === "success") {
        alert("submited");
        setuseDetailsIsSuccess(true);
      } 
     else if (tempSendData === "alreadyExists") {
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
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Guest / Business Name" {...field} />
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
                  <Input placeholder="Enter Your Contact Number" {...field} />
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
                  <Input placeholder="Enter Your Email" {...field} />
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
                  <Input placeholder="Enter Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/3 p-2 mt-3">
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
        <div className="flex w-full mt-3">
          {form.control._formValues.IsGST === "yes" && (
            <div className="w-1/3 p-2 mt-3">
              <FormField
                control={form.control}
                name="CompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.control._formValues.IsGST === "yes" && (
            <div className="w-1/3 p-2">
              <FormField
                control={form.control}
                name="CompanyGST"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company GST</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Company GST" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.control._formValues.IsGST === "yes" && (
            <div className="w-1/3 p-2 mt-3">
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Confirm</Button>
      </form>
    </Form>
  );
}
