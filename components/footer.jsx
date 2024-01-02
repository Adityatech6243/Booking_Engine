"use client";
import React from "react";

export function Footer() {
  return (
    <div className="bg-dark text-center p-3 text-black">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full lg:w-1/2">
          <img src="Athang-logo.svg" alt="athang-logo" className="w-28" />
        </div>
        <div className="w-full lg:w-1/2  text-center md:text-right sm:mt-4">
          <span>
            &copy; {new Date().getFullYear()} Copyright: Developed By{" "}
            <a
              className="text-info"
              href="//athanginfotech.com"
              target="_blank"
            >
              Athang InfoTech
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
