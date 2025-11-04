import React, { useState } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";


const TourGallery = ({ tour }) => {
  // 🧤 Guard: tour null ya undefined ho to safe fallback
  if (!tour) {
    return (
      <div className="text-center text-gray-500 p-10">Loading gallery...</div>
    );
  }

  const baseURL = "http://localhost:5000/";
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // ✅ Convert images into full URLs
  const images =
    tour?.galleryImages?.map((img) =>
      img?.startsWith("http") ? img : `${baseURL}${img}`
    ) || [];

  // 🧤 Guard: agar koi image nahi hai
  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 p-10">
        No gallery images available
      </div>
    );
  }

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="relative flex bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Sidebar Thumbnails */}
      <div className="flex flex-col gap-2 p-2 bg-white shadow-inner rounded-l-xl overflow-y-auto max-h-[420px]">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${tour?.title || "Tour"} thumb ${idx + 1}`}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 hover:scale-105 ${
              mainImage === img ? "border-[#e82429]" : "border-transparent"
            }`}
            onClick={() => {
              setMainImage(img);
              setPhotoIndex(idx);
            }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <img
          src={mainImage}
          alt={tour?.title || "Tour Image"}
          className="w-full h-[420px] object-cover rounded-r-2xl cursor-pointer"
          onClick={() => {
            setPhotoIndex(images.indexOf(mainImage));
            setTimeout(() => setIsOpen(true), 0);
          }}
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          Click to zoom
        </div>
      </div>

      {/* ✅ Safe Lightbox Rendering */}
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
