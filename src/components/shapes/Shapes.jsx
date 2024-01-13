import React, { useState } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Rectangle from './Rectangle';
import Circular from './Circular';
import Elliptical from './Eliptical';
import Polygon from './Polygon';

const shapes = [
  {
    x: 20,
    y: 50,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect',
  },
  {
    x: 200,
    y: 100,
    radius: 50,
    fill: 'green',
    id: 'circle',
  },
  {
    x: 250,
    y: 300,
    radius: {
      x: 80,
      y: 40,
    },
    fill: 'blue',
    id: 'ellipse',
  },
  {
    x: 20,
    y: 300,
    points: [0, 0, 100, 0, 100, 100],
    tension: 0.5,
    stroke: 'black',
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'red', 1, 'yellow'],
    closed: true,
    id: 'polygon',
  },
];

const Shapes = () => {
  const [rectangle, setRectangle] = useState(shapes[0]);
  const [circular, setCircular] = useState(shapes[1]);
  const [elliptical, setElliptical] = useState(shapes[2]);
  const [polygon, setPolygon] = useState(shapes[3]);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  return (
    <Stage
    width={window.innerWidth}
    height={window.innerHeight - 50}
    onMouseDown={checkDeselect}
    onTouchStart={checkDeselect}
    >
      <Layer>
        <Text text="Here are some shapes" fontSize={16} />
        <Rectangle
          shapeProps={rectangle}
          isSelected={rectangle.id === selectedId}
          onSelect={() => {
            selectShape(rectangle.id);
          }}
          onChange={(newAttrs) => {
            setRectangle(newAttrs);
          }}
            />
        <Circular
          shapeProps={circular}
          isSelected={circular.id === selectedId}
          onSelect={() => {
            selectShape(circular.id);
          }}
          onChange={(newAttrs) => {
            setCircular(newAttrs);
          }}
      />
      <Elliptical
          shapeProps={elliptical}
          isSelected={elliptical.id === selectedId}
          onSelect={() => {
            selectShape(elliptical.id);
          }}
          onChange={(newAttrs) => {
            setElliptical(newAttrs);
          }}
      />
      <Polygon
        shapeProps={polygon}
        isSelected={polygon.id === selectedId}
        onSelect={() => {
          selectShape(polygon.id);
        }}
        onChange={(newAttrs) => {
          setPolygon(newAttrs);
        }}
      />
      </Layer>
    </Stage>
  );
};

export default Shapes;


