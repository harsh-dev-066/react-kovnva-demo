import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import Box from './Box';
import './style.css';

const TRANSPARENT_BG_STYLE = {
  backgroundImage: `linear-gradient(45deg, #efefef 25%, #efefef00 25%, #efefef00 75%, #efefef 75%, #efefef), 
                    linear-gradient(45deg, #efefef 25%, #efefef00 25%, #efefef00 75%, #efefef 75%, #efefef)`,
  backgroundPosition: '0 0, 10px 10px',
  backgroundSize: '21px 21px',
};
const LOWER_SCALE_LIMIT = 0.6;
const UPPER_SCALE_LIMIT = 10;

const getUniqueId = (base = 16) => `id${Math.random().toString(base).slice(2)}`;

const ImageCanvas = ({ imageUrl }) => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [imageData, setImageData] = useState({});
  const [stageData, setStageData] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  console.log('annotations', annotations)

  const canvasRef = useRef();
  const imageRef = useRef();
  const stageRef = useRef();

  const [canvasImage] = useImage(imageUrl);

  const computeDimensions = (img) => {
    const canvasHeight = canvasRef.current?.clientHeight;
    const canvasWidth = canvasRef.current?.clientWidth;
      
    setStageData({
      x: 0,
      y: 0,
      scale: 1,
      height: canvasHeight,
      width: canvasWidth,
    });
    const imageHeight = img.naturalHeight;
    const imageWidth = img.naturalWidth;
    if (canvasHeight && canvasWidth && imageHeight && imageWidth) {
      const aspectRatio = imageWidth / imageHeight;
      let newImageHeight;
      let newImageWidth;
        // Setting image height to canvas height and setting the image width as per aspect ratio
        newImageHeight = canvasHeight;
        if (imageHeight < newImageHeight) {
          const heightScaled = newImageHeight / imageHeight;
          if (heightScaled > 2) {
            newImageHeight = imageHeight * 2;
          }
        }
        newImageWidth = newImageHeight * aspectRatio;
      // Centering the image
      const x = (canvasWidth - newImageWidth) / 2;
      const y = (canvasHeight - newImageHeight) / 2;
      setImageData({
        height: newImageHeight,
        width: newImageWidth,
        x,
        y,
      });
    }
  };

  useEffect(() => {
    if (canvasImage && canvasRef?.current) {
      canvasImage?.addEventListener('load', computeDimensions(canvasImage));
    }

    return () => canvasImage?.removeEventListener('load', computeDimensions);
  }, [canvasImage]);

  useEffect(() => {
      canvasRef.current.style.cursor = 'crosshair';
  }, []);

  const onCreate = () => {
    let newAnnotationCpy = [...newAnnotation];
    setAnnotations([...annotations, {
      ...newAnnotationCpy[0],
      isDrawing: false,
      id: getUniqueId(),
    }]);
    setNewAnnotation([]);
  };

  const handleMouseDown = (e) => {
    if (e.target === stageRef.current || e.target === imageRef.current) {
      setIsMouseDown(true);
      setActiveAnnotation(null);
      if (newAnnotation?.length === 0) {
        // Getting relative position of stage, since the stage can be zoomed
        const { x, y } = stageRef.current.getRelativePointerPosition();
          setNewAnnotation([
            {
              shape: 'rect',
              x,
              y,
              width: 0,
              height: 0,
              isDrawing: true,
            },
          ]);
      }
    }
  };

  const handleMouseMove = () => {
      if (newAnnotation?.length === 1 && isMouseDown) {
        const { x: sx, y: sy} = newAnnotation[0];
        const { x, y } = stageRef.current.getRelativePointerPosition();
          setNewAnnotation([
            {
              shape: 'rect',
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              isDrawing: true,
            },
          ]);
    }
  };

  const handleMouseUp = () => {
      setIsMouseDown(false);
      if (newAnnotation?.length === 1 && (newAnnotation[0].width)) {
          onCreate();
      } else {
        setNewAnnotation([]);
      }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  const handleZoom = (zoomAction) => {
    const zoomScale = 1.04;
    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    const oldScale = stage.scaleX();
    // Multiplying stage scale by zoomBy constant for zoom-in and dividing for zoom-out
    const newScale = zoomAction === 'zoom-in' ? oldScale * zoomScale : oldScale / zoomScale;
    const { width, height } = stageData;
    setStageData({
      width,
      height,
      scale: newScale,
      /*
       * Recalculating the coordinates to prevent the stage position deviating
       *  from the current position the user is focusing on during zoom-in/zoom-out
       */
      x: (pointerPos.x / newScale - ((pointerPos.x - stage.x()) / oldScale)) * newScale,
      y: (pointerPos.y / newScale - ((pointerPos.y - stage.y()) / oldScale)) * newScale,
    });
  };

  const handleClick = (e) => {
    if ((e.target === stageRef.current || e.target === imageRef.current)) {
      if (activeAnnotation) setActiveAnnotation(null);
    }
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    if ((e.evt.deltaY > 0) && (stageData?.scale > LOWER_SCALE_LIMIT)) {
      handleZoom('zoom-out');
    } else if ((e.evt.deltaY < 0) && (stageData?.scale < UPPER_SCALE_LIMIT)) {
      handleZoom('zoom-in');
    }
  };

  const onResetZoom = () => {
    const { width, height } = stageData;
    setStageData({
      x: 0,
      y: 0,
      scale: 1,
      width,
      height,
    });
  };

  const onClear = () => {
    setAnnotations([]);
  };


  return (
    <div className='main'>
    <div
      className="annotation-canvas align-self-stretch flex-grow-1"
      style={{
        width: '80%',
      }}
      ref={canvasRef}
    >
      <Stage
        width={stageData.width || 0}
        height={stageData.height || 0}
        ref={stageRef}
        x={stageData.x}
        y={stageData.y}
        scaleX={stageData.scale}
        scaleY={stageData.scale}
        onClick={handleClick}
        style={TRANSPARENT_BG_STYLE}
        onWheel={handleWheel}
      >
        <Layer>
          <Text text="Try to draw boxes" fontSize={16} />
          <Image
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={imageRef}
            x={imageData.x || 0}
            y={imageData.y || 0}
            image={canvasImage}
            height={imageData.height || 0}
            width={imageData.width || 0}
          />
          {annotationsToDraw?.map((value) => (
            <>
              <Box
                value={value}
                key={value.id}
                activeAnnotation={activeAnnotation}
                setActiveAnnotation={setActiveAnnotation}
                isAnnotaionDrawn={!!newAnnotation?.length}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseMove={handleMouseMove}
                stageRef={stageRef}
              />
            </>
          ))}
        </Layer>
      </Stage>
    </div>
    <div className='crop-section'>
      <div className='actions'>
      <button className="reset-zoom" onClick={onResetZoom} >Reset Zoom</button>
      <button disabled={annotations?.length === 0} className="reset-zoom" onClick={onClear} >Clear</button>
      </div>
    </div>
    </div>
  );
};

export default ImageCanvas;
