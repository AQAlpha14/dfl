"use client";

// pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
// You can also pass icon names as strings directly to Icon: icon="mdi:home-outline"

const images = [
  "/images/image_63.webp",
  "/images/image_64.webp",
  "/images/image_65.webp",
  "/images/image_65.webp",
];

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("list");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!modalOpen) return;
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft")
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        setCurrentIndex((i) => (i + 1) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  function openAt(i: number) {
    setCurrentIndex(i);
    setModalOpen(true);
  }

  return (
    <div className="secPadding">
      <div className="container">
        {/* Main */}
        <main className="pt-10 pb-28">
          <section className="px-4 py-6">
            {/* Gallery grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={images[0]}
                    alt="Main"
                    className="w-full h-64 sm:h-80 object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => openAt(0)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-3">
                  <img
                    src={images[1]}
                    alt="Thumb 1"
                    className="w-full h-32 sm:h-36 object-cover rounded-xl cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => openAt(1)}
                  />
                  <img
                    src={images[2]}
                    alt="Thumb 2"
                    className="w-full h-32 sm:h-36 object-cover rounded-xl cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => openAt(2)}
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl h-36 sm:h-full">
                  <img
                    src={images[3]}
                    alt="Thumb 3"
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => openAt(3)}
                  />
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Icon icon="mdi:photo" className="h-5 w-5" />
                  <span className="text-sm font-medium">More photos</span>
                </button>
              </div>
            </div>
          </section>
        </main>
        {/* Modal Slider */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-4xl mx-4 sm:mx-6">
              <button
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white"
              >
                <Icon icon="mdi:close" className="h-6 w-6 text-gray-800" />
              </button>

              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="flex items-center justify-between absolute inset-y-0 left-0 right-0 pointer-events-none">
                  <button
                    aria-label="Prev"
                    onClick={() =>
                      setCurrentIndex(
                        (i) => (i - 1 + images.length) % images.length,
                      )
                    }
                    className="pointer-events-auto ml-2 p-2 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Icon
                      icon="mdi:chevron-left"
                      className="h-6 w-6 text-gray-800"
                    />
                  </button>

                  <button
                    aria-label="Next"
                    onClick={() =>
                      setCurrentIndex((i) => (i + 1) % images.length)
                    }
                    className="pointer-events-auto mr-2 p-2 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Icon
                      icon="mdi:chevron-right"
                      className="h-6 w-6 text-gray-800"
                    />
                  </button>
                </div>

                <div className="w-full h-[60vh] sm:h-[70vh] flex items-center justify-center bg-black">
                  <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="px-4 py-3 bg-black/60 text-white flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{currentIndex + 1}</span>
                    <span className="text-gray-200"> / {images.length}</span>
                  </div>
                  <div className="flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 w-8 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/40"}`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
