import { useState, useEffect, useRef } from "react";

const Draggable = ({ id, x, y, onDrag, children, enabled, label, zoom }) => {
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!enabled) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = {
      x: (e.clientX - rect.left) / (zoom / 100),
      y: (e.clientY - rect.top) / (zoom / 100),
    };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const parentContainer = document.getElementById(id);
      if (!parentContainer) return;
      const parentRect = parentContainer.getBoundingClientRect();
      const newX =
        (e.clientX - parentRect.left) / (zoom / 100) - offset.current.x;
      const newY =
        (e.clientY - parentRect.top) / (zoom / 100) - offset.current.y;
      onDrag(newX, newY);
    };

    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onDrag, id, zoom]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        cursor: enabled ? (isDragging ? "grabbing" : "grab") : "default",
        zIndex: 20,
        userSelect: "none",
        transition: isDragging ? "none" : "box-shadow 0.2s",
      }}
      onMouseDown={onMouseDown}
      className={`${enabled ? "hover:outline-2 hover:outline-dashed hover:outline-indigo-500 group" : ""}`}
    >
      {enabled && (
        <div
          className="absolute -top-6 right-0 bg-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none z-30"
          dir="rtl"
        >
          {label} (بکشید تا جابجا شود)
        </div>
      )}
      {children}
    </div>
  );
};

export default Draggable;
