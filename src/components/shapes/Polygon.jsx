import React, { useRef, Fragment } from 'react';
import { Line, Transformer } from 'react-konva';

const Polygon = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Line
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            points: [
              node.points()[0] * scaleX,
              node.points()[1] * scaleY,
              node.points()[2] * scaleX,
              node.points()[3] * scaleY,
              node.points()[4] * scaleX,
              node.points()[5] * scaleY,

            ],
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
        />
      )}
    </Fragment>
  );
};

export default Polygon;
