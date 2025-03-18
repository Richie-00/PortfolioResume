import React, { useState, useRef, useEffect } from 'react';

// ... (rest of your imports, like icons)

const MovableLinksCard = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener('mousemove', handleMouseMove);
      cardElement.addEventListener('mouseup', handleMouseUp);
      cardElement.addEventListener('mouseleave', handleMouseUp);

      return () => {
        cardElement.removeEventListener('mousemove', handleMouseMove);
        cardElement.removeEventListener('mouseup', handleMouseUp);
        cardElement.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={cardRef}
      className="relative w-52 h-52 bg-gray-300 rounded-3xl overflow-hidden shadow-lg transition-all duration-1000 ease-in-out hover:scale-110 group cursor-move"
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      {/* ... (rest of your card's content) */}
    </div>
  );
};

export default MovableLinksCard;