import React, { useState, useEffect } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

// Top section are here 
const TourGallery = ({ tour }) => {
  if (!tour) {
    return (
      <div className="text-center text-gray-500 p-10">Loading gallery...</div>
    );
  }

  const baseURL =
    import.meta.env.VITE_API_URL || "https://desetplanner-backend.onrender.com";

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images =
    tour?.galleryImages?.map((img) =>
      img?.startsWith("http") ? img : `${baseURL}/${img}`
    ) || [];

  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
      setPhotoIndex(0);
    }
  }, [tour?._id, tour?.galleryImages]);

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 p-10">
        No gallery images available
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden">
      {/* 🌄 Main Image */}
      <div className="relative w-full">
        <img
          src={mainImage}
          alt={tour?.title || "Tour Image"}
          className="
            w-full h-auto max-h-[600px] object-cover
            rounded-2xl cursor-pointer
            transition-transform duration-300 hover:scale-[1.02]
          "
          onClick={() => {
            setPhotoIndex(images.indexOf(mainImage));
            setTimeout(() => setIsOpen(true), 0);
          }}
        />

        {/* 🖼️ Left-Side Thumbnails (Desktop Only) */}
        <div
          className="
            hidden md:flex
            absolute top-1/2 -translate-y-1/2 left-4
            flex-col gap-3 
            bg-white/30 backdrop-blur-sm 
            p-2 rounded-2xl shadow-lg
            max-h-[70%] overflow-y-auto
            scrollbar-hide
          "
        >
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`
                w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer
                border-2 transition-all duration-200
                hover:scale-105 hover:brightness-110
                ${
                  mainImage === img
                    ? "border-[#e82429] ring-2 ring-[#e82429]/30"
                    : "border-transparent"
                }
              `}
              onClick={() => {
                setMainImage(img);
                setPhotoIndex(idx);
              }}
            />
          ))}
        </div>
      </div>

      {/* 📱 Mobile Thumbnail Row (Horizontal Scroll) */}
      <div
        className="
          flex md:hidden 
          overflow-x-auto scrollbar-hide
          gap-3 p-3 bg-gray-50
          border-t border-gray-200
          flex-nowrap
        "
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumb-${idx}`}
            className={`
              w-20 h-20 flex-shrink-0 object-cover rounded-lg cursor-pointer
              border-2 transition-all duration-200
              hover:scale-105 hover:brightness-110
              ${
                mainImage === img
                  ? "border-[#e82429] ring-2 ring-[#e82429]/30"
                  : "border-transparent"
              }
            `}
            onClick={() => {
              setMainImage(img);
              setPhotoIndex(idx);
            }}
          />
        ))}
      </div>

      {/* ✅ Lightbox */}
      {typeof window !== "undefined" && isOpen && images.length > 0 && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          imageTitle={tour?.title || ""}
        />
      )}
    </div>
  );
};

export default TourGallery;
