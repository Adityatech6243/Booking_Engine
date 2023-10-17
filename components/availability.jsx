"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "@/components/slider";
import { currency } from "@/lib/constant";
import { useState } from "react";

export function Availability(props) {
  const [roomdata, setroomdata] = useState();
  const [RoomIdType, setRoomIdType] = useState({});

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
                RoomName: roomdata?.RoomName,
                RoomType: "Room Only",
                price: roomdata?.PricePerNight,
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
                RoomName: roomdata?.RoomName,
                RoomType: "With Breakfast",
                price: roomdata?.RoomsWithBreakFast,
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
                RoomName: roomdata?.RoomName,
                RoomType: "All Inclusive",
                price: roomdata?.RoomsWithAllMeals,
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
