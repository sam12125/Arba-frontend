import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Array of placeholder image URLs
  const images = [
    "https://via.placeholder.com/840x360",
    "https://via.placeholder.com/840x360",
    "https://via.placeholder.com/840x360",
    "https://via.placeholder.com/840x360",
    "https://via.placeholder.com/840x360",
  ];

  return (
    <Slider {...settings} style={{ marginTop: "20px" }}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ width: "90%", height: "auto" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
