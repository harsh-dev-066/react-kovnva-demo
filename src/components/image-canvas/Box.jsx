import React, { useRef, useEffect, useState } from 'react';
import { Rect, Transformer } from 'react-konva';

const Box = (props) => {
  const {
    value,
    activeAnnotation,
    setActiveAnnotation,
    isAnnotaionDrawn,
  } = props;

  const transformerRef = useRef();
  const shapeRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const shapeOnClick = (e, id) => {
    shapeRef.current = e.target;
    e.cancelBubble = true;
    setActiveAnnotation(id);
  };

  useEffect(() => {
    setIsActive(value.isDrawing === true || value.id === activeAnnotation);
  }, [value, activeAnnotation, value.isDrawing]);

  const DASH_LENGTH = 4;
  const DASH_SPACING = 1;
  const PRIMARY_BLUE = '#2962ff';
  const SECONDARY_BLUE = '#5a5e9a';
  const TRANSPARENT_BLUE = 'rgba(41, 98, 255, 0.12)';
  const SECONDARY_GRAY = '#c6cde0';

  const getStrokeColor = () => {
    let strokeColor = SECONDARY_BLUE;
    if (isAnnotaionDrawn && !isActive) {
      strokeColor = SECONDARY_GRAY;
    } else if (isActive) {
      strokeColor = PRIMARY_BLUE;
    }
    return strokeColor;
  };

  return (
    <>
      {value.shape === 'rect' && (
        <Rect
          x={value.x}
          y={value.y}
          width={value.width}
          height={value.height}
          fill={isActive ? TRANSPARENT_BLUE : null}
          stroke={getStrokeColor()}
          strokeWidth={2}
          dash={isActive ? [DASH_LENGTH, DASH_SPACING] : null}
          id={value.id}
          onClick={(e) => shapeOnClick(e, value.id)}
          ref={shapeRef}
          draggable={!!isActive}
        />
      )}
      {(value.id === activeAnnotation && shapeRef?.current) && (
        <Transformer
          ref={transformerRef}
          nodes={[shapeRef?.current]}
          rotateEnabled={false}
          anchorStroke={PRIMARY_BLUE}
          anchorFill={PRIMARY_BLUE}
          anchorSize={6}
          borderStrokeWidth={0}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
        />
      )}
    </>
  );
};

export default Box;
