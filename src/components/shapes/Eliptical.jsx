import React, { useRef, Fragment } from 'react';
import { Transformer, Ellipse } from 'react-konva';

const Elliptical = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Ellipse
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
            radius: {
              x: node.radiusX() * scaleX,
              y: node.radiusY() * scaleY,
            }
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

export default Elliptical;
