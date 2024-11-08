import { useRef, useState } from 'react';

export default function CardContainer({ titulo, children }) {
    const containerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (scrollOffset) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollOffset;
            updateArrows();
        }
    };

    const updateArrows = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
            <div className="relative">
                {showLeftArrow && (
                    <button 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                        onClick={() => scroll(-200)}
                    >
                        &lt;
                    </button>
                )}
                <div 
                    className="flex overflow-x-auto scrollbar-hide space-x-4 py-4"
                    ref={containerRef}
                    onScroll={updateArrows}
                >
                    {children}
                </div>
                {showRightArrow && (
                    <button 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                        onClick={() => scroll(200)}
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
}