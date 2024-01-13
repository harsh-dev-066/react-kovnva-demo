import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";


const ImgElement = ({ id, src, x, y }) => {
  const [image] = useImage(src);

  return (
    <Image
      id={id}
      x={x}
      y={y}
      draggable
      image={image}
      width={70}
      height={70}
    />
  );
};

export default ImgElement;

