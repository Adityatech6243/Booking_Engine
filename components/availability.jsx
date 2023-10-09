"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "@/components/slider";
import { currency } from "@/lib/constant";


export function Availability({room}) {
  return (
    <div>
      <div class="flex">
        <div class="w-1/3 p-4">
          <Slider images={room.RoomPhotos.split(",")} />
        </div>
        <div class="w-1/3 p-4">
          <p class="mb-1">
            <b>
              {room.RoomName}
              <sup> (Only 1 Room(s) left)</sup>
            </b>
          </p>
          <p class="mb-4">{room.Description}</p>
          <Button>View Other Available Rates</Button>
        </div>
        <div class="w-1/3 p-4">
          {currency}
          {room.PricePerNight}/-
          <br />
          <span>Avg. Per Room/Night</span>
        </div>
      </div>{" "}
      <div class="flex">
        <div class="w-1/3 p-4">Room Only</div>
        <div class="w-1/3 p-4"> {currency}3190/- Price</div>
        <div class="w-1/3 p-4">
          {" "}
          <Button>Select</Button>
        </div>
      </div>
      <div class="flex">
        <div class="w-1/3 p-4">Rooms with Breakfast</div>
        <div class="w-1/3 p-4"> {currency}3520 /- Price</div>
        <div class="w-1/3 p-4">
          <Button>Select</Button>
        </div>
      </div>
      <div class="flex">
        <div class="w-1/3 p-4">Rooms With All Meals</div>
        <div class="w-1/3 p-4"> {currency}3190/- Price</div>
        <div class="w-1/3 p-4">
          <Button>Select</Button>
        </div>
      </div>
    </div>
  );
}
