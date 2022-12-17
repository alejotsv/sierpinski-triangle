import React from 'react';
import { useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  }

  return(
    <canvas ref={canvasRef} width={600} height={400} />
  )
}

export default Canvas;