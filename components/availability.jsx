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
          {roomdata?.RoomsWithBreakFast}/-
          <br />
          <span>Avg. Per Room/Night</span>
        </div>
      </div>
      {/* <div className="flex">
        <div className="w-1/3 p-4">Room with Breakfast</div>
        <div className="w-1/3 p-4">
          {currency}
          {roomdata?.PricePerNight}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomType: "Room Only",
                ...roomdata,
              });
              props.handleSearch();
            }}
          >
            Select
          </Button>
        </div>
      </div> */}
      <div className="flex">
        <div className="w-1/3 p-4">Rooms with Breakfast</div>
        <div className="w-1/3 p-4">
          {currency}
          {roomdata?.RoomsWithBreakFast}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomType: "With Breakfast",
                ...roomdata,
              });
              props.handleSearch();
            }}
          >
            Select
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex">
        <div className="w-1/3 p-4">Rooms With All Meals</div>
        <div className="w-1/3 p-4">
          {currency}
          {roomdata?.RoomsWithAllMeals}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button
            onClick={() => {
              setRoomIdType({
                RoomType: "All Inclusive",
                ...roomdata,
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
