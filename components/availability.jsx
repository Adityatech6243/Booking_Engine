"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "@/components/slider";
import { currency } from "@/lib/constant";
import { useState } from "react";

export function Availability(props) {
  const [roomdata, setroomdata] = useState();
  const [RoomIdType, setRoomIdType] = useState({});
  // const setID=()=>{
  //   var arr={"RoomID":roomdata.RoomID}
  // props.setFinaldata(arr);
  // }

  React.useEffect(() => props.setFinaldata(RoomIdType), [RoomIdType]);

  React.useEffect(() => {
    setroomdata(props?.room);
  }, [props]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4">
          <Slider images={roomdata?.RoomPhotos.split(",")} />
        </div>
        <div className="lg:w-1/3 p-4">
          <p className="mb-1">
            <b>
              {roomdata?.RoomName}
              <sup> (Only 1 Room(s) left)</sup>
            </b>
          </p>
          <p className="mb-4">{roomdata?.Description}</p>
        </div>
        <div className="lg:w-1/3 p-4">
          {currency}
          {roomdata?.PricePerNight}/-
          <br />
          <span>Avg. Per Room/Night</span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Room Only</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency}
          {roomdata?.PricePerNight}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomID: roomdata?.RoomID,
                RoomType: "Room Only",
              });
              props.handleSearch();
            }}
          >
            Select
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Rooms with Breakfast</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency}
          {roomdata?.RoomsWithBreakFast} /- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomID: roomdata?.RoomID,
                RoomType: "With Breakfast",
              });
              props.handleSearch();
            }}
          >
            Select
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Rooms With All Meals</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency} {roomdata?.RoomsWithAllMeals}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomID: roomdata?.RoomID,
                RoomType: "All Inclusive",
              });
              props.handleSearch();
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}
