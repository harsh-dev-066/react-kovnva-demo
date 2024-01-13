import React, { useRef, Fragment } from 'react';
import { Circle, Transformer } from 'react-konva';

const Circular = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  return (
    <Fragment>
      <Circle
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

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: node.radius() * scaleX,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[shapeRef?.current]}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
        />
      )}
    </Fragment>
  );
};

export default Circular;
