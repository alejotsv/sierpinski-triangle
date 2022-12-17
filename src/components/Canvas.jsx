import React from 'react';
import { useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
  }

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return(
    <div>
      <canvas ref={canvasRef} width={600} height={400} />
      <button onClick={draw}>Draw</button>
      <button onClick={clear}>Clear</button>
    </div>
  )
}

export default Canvas;