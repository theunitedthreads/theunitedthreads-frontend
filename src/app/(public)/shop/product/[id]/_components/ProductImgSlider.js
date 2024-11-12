"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "./ProductImgSlider.css";
import Lightbox from "yet-another-react-lightbox";
import NextJsImage from "@/components/NextJsImage/NextJsImage";
import {
  Fullscreen,
  Zoom,
  Slideshow,
} from "yet-another-react-lightbox/plugins";
// import { showImage } from "@/utils/fileHelper";

export default function ProductImgSlider({ images, primaryImage }) {
  let imagesArr = [{ url: primaryImage, key: "primary-image" }, ...images];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [lightboxImageIndex, setlightboxImageIndex] = useState(-1); // Hide lightbox if index -1

  // Define image slides for lightbox
  const imageSlides = imagesArr?.map((image) => {
    return { ...image, src: image.url };
  });

  const settings = {
    customPaging: function (i) {
      return (
        <div>
          <Image
            src={imagesArr[i]?.url}
            alt={`product image ${currentImgIndex}`}
            className="mx-auto block w-1/2 p-4"
            layout="fill"
            objectFit="contain"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "product-img-slider",
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    easing: "easeInOut",
  };

  return (
    <>
      <Slider {...settings}>
        {imagesArr?.map((img, index) => (
          <div
            key={img.key}
            onClick={() => setCurrentImgIndex(index)}
            className="product-img-container h-[590px] w-full rounded bg-foundation-white-hover"
          >
            <Image
              src={img.url}
              alt={`product image ${currentImgIndex}`}
              width={500}
              height={500}
              className="block cursor-pointer"
              onClick={() => setlightboxImageIndex(index)}
              title="Click to expand"
            />
          </div>
        ))}
      </Slider>

      {/* -------- Image Lightbox --------- */}
      <Lightbox
        index={lightboxImageIndex}
        slides={imageSlides || []}
        open={lightboxImageIndex >= 0}
        close={() => setlightboxImageIndex(-1)}
        render={{ slide: NextJsImage }}
        plugins={[Fullscreen, Zoom, Slideshow]}
      />
    </>
  );
}
