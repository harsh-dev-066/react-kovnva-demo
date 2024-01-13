import React from 'react';
import { Stage, Layer, Text, Star, Group } from 'react-konva';
import ImgElement from './ImgElement';

const generateShapes = () => {
  const colorsArray = ['red', 'blue', 'green', 'orange', 'purple', 'violet'];
  return [...Array(50)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    imgSrc: 'https://udupicitycentre.com/wp-content/uploads/2019/01/vneck-tee-2.jpg',
    isDragging: false,
    color: colorsArray[Math.floor(Math.random()*colorsArray.length)],
    rotation: Math.random() * 180,
  }));
}

const INITIAL_STATE = generateShapes();

const Cluster = () => {
  const [images, setImages] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setImages(
      images.map((img) => {
        return {
          ...img,
          isDragging: img.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setImages(
      images.map((img) => {
        return {
          ...img,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight - 50}>
      <Layer>
        <Text text="Try to drag images" fontSize={16} />
        {images.map((img) => (
          <Group>
          {/* <ImgElement
            key={img.id}
            src={img.imgSrc}
            x={img.x}
            y={img.y}
          /> */}
          <Star
            key={img.id}
            id={img.id}
            x={img.x}
            y={img.y}
            innerRadius={20}
            outerRadius={40}
            fill={img.color}
            opacity={0.8}
            draggable
            rotation={img.rotation}
            scaleX={img.isDragging ? 1.2 : 1}
            scaleY={img.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

export default Cluster;
