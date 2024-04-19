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
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "10px",
            height: "10px",
            background: "#00abc5",
            borderRadius: "5px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        ></div>
      );
    },
  };

  // Array of placeholder image URLs
  const images = [
    "https://i.ibb.co/9hKd4kv/Screenshot-34.png",
    "https://i.ibb.co/9hKd4kv/Screenshot-34.png",
    "https://i.ibb.co/9hKd4kv/Screenshot-34.png",
    "https://i.ibb.co/9hKd4kv/Screenshot-34.png",
    "https://i.ibb.co/9hKd4kv/Screenshot-34.png",
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
