import React, { useRef } from "react";

const Carousel = ({ children, titulo }) => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const scrollTo = direction === "left" 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            
            carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
            <div className="relative">
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    onClick={() => scroll("left")}
                >
                    &lt;
                </button>
                <div 
                    ref={carouselRef}
                    className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {children}
                </div>
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                    onClick={() => scroll("right")}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Carousel;