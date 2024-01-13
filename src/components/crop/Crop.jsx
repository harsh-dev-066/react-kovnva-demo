import React, { useState } from 'react';
import { Stage, Layer, Image, Rect, Text } from 'react-konva';
import useImage from 'use-image';

const Crop = ({ imageUrl }) => {
  const [image] = useImage(imageUrl);
  const [crop, setCrop] = useState({ x: 130, y: 20, width: 200, height: 200 });

  const handleDragEnd = () => {
    const rect = rectRef.current;
    if (rect) {
      setCrop({
        x: rect.x(),
        y: rect.y(),
        width: rect.width(),
        height: rect.height(),
      });
    }
  };

  const rectRef = React.useRef();

  return (
    <div style={{ display: 'flex' }}>
      <Stage width={window.innerWidth / 2} height={window.innerHeight - 20}>
        <Layer>
          <Image image={image} />
          <Rect
            x={crop.x}
            y={crop.y}
            width={crop.width}
            height={crop.height}
            draggable
            stroke="red"
            strokeWidth={2}
            ref={rectRef}
            onDragEnd={handleDragEnd}
          />
          <Text text="Try to drag box on the image" fontSize={16} />
        </Layer>
      </Stage>
      <Stage width={window.innerWidth / 2} height={window.innerHeight}>
        <Layer>
          <Image image={image} crop={crop} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Crop;
