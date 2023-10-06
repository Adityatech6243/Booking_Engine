import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const Slider = () => {
  return (
    <div>
      <Carousel>
        <div>
          <Image
            src="/images/img1.jpg"
            alt="Image 1"
            width={500} // Specify the desired width
            height={300} // Specify the desired height
          />
        </div>
        <div>
          <Image
            src="/images/img2.jpg"
            alt="Image 2"
            width={500} // Specify the desired width
            height={300} // Specify the desired height
          />{" "}
        </div>
        <div>
          <Image
            src="/images/img3.jpg"
            alt="Image 3"
            width={500} // Specify the desired width
            height={300} // Specify the desired height
          />{" "}
        </div>
        <div>
          <Image
            src="/images/img4.jpg"
            alt="Image 4"
            width={500} // Specify the desired width
            height={300} // Specify the desired height
          />{" "}
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
