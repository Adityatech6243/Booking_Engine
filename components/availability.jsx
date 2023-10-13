"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "@/components/slider";
import { currency } from "@/lib/constant";
import { useState } from "react";



export function Availability({setRoomId, room }) {

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 p-4">
          <Slider images={room.RoomPhotos.split(",")} />
        </div>
        <div className="lg:w-1/3 p-4">
          <p className="mb-1">
            <b>
              {room.RoomName}
              <sup> (Only 1 Room(s) left)</sup>
            </b>
          </p>
          <p className="mb-4">{room.Description}</p>
        </div>
        <div className="lg:w-1/3 p-4">
          {currency}
          {room.PricePerNight}/-
          <br />
          <span>Avg. Per Room/Night</span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Room Only</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency}
          {room.PricePerNight}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button onClick={() => setRoomId(room.RoomID)}>Select</Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Rooms with Breakfast</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency}
          {room.RoomsWithBreakFast} /- Price
        </div>
        <div className="w-1/3 p-4">
          <Button onClick={() => setRoomId(room.RoomID)}>Select</Button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4">Rooms With All Meals</div>
        <div className="w-1/3 p-4">
          {" "}
          {currency} {room.RoomsWithAllMeals}/- Price
        </div>
        <div className="w-1/3 p-4">
          <Button onClick={() => setRoomId(room.RoomID)}>Select</Button>
        </div>
      </div>
    </div>
  );
}
