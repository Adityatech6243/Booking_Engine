import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const Slider = ({images}) => {
  return (
    <div>
      <Carousel>
        {images?.map((item, i) =>
          <div key={i}>
            <Image
              src={item}
              alt="Image 1"
              width={500} // Specify the desired width
              height={300} // Specify the desired height
            />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Slider;
