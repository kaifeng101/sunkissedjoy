import React from "react";
import DrawingStyleComponent from "./DrawingStyleComponent";

const DrawingStylesGroup = ({ drawingItems }) => {
  return (
    <div className="grid grid-cols-3 gap-16 max-lg:gap-12 max-md:gap-8 max-sm:grid-cols-2 max-xs:gap-6 max-xs:gap-y-8">
      {drawingItems?.map((item, idx) => (
        <DrawingStyleComponent data={item} key={idx} />
      ))}
    </div>
  );
};

export default DrawingStylesGroup;
