import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const Canvas = (props) => {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);
  let [message, setMessage] = useState('');

  // Variables for random dots
  let x;
  let y;

  const canvasRef = useRef(null);
  
  let startX = 0;
  let startY = 0;  
  
  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(startX, startY, 50, 50);
    
    if(startX < width-50){
      startX += 50;
    } else if (startY < height-50){
      startY += 50;
      startX = 0;
    } else {
      message = 'You filled it all!';
      setMessage(message);
    }

  }

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startX = 0;
    startY = 0;
    message = '';
    setMessage(message);
  }

  const drawTriangles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set base coordinates
    const firstDot = [300, 10];
    const secondDot = [50, 550];
    const thirdDot = [550, 550];

    // Draw dots on base coordinates
    drawDot(firstDot[0], firstDot[1]);
    drawDot(secondDot[0], secondDot[1]);
    drawDot(thirdDot[0], thirdDot[1]);

    // Establish triangle boundaries for random dots
    ctx.beginPath();
    ctx.moveTo(firstDot[0], firstDot[1]);
    ctx.lineTo(secondDot[0], secondDot[1]);
    ctx.lineTo(thirdDot[0], thirdDot[1]);
    ctx.closePath();

    x = Math.random() * 600; // Generate a random x coordinate
    y = Math.random() * 600; // Generate a random y coordinate
    if (ctx.isPointInPath(x, y)) { // Test if the point is inside the triangle
      console.log('x: ' + x + ' y: ' + y + ' is inside the triangle');
      drawDot(x, y);
    } else {
      console.log('x: ' + x + ' y: ' + y + ' is outside the triangle');
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

  }

  const drawDot = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return(
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
      <button onClick={draw}>Draw</button>
      <button onClick={clear}>Clear</button>
      <button onClick={drawTriangles}>Draw Triangles</button>
      {message != '' && <h1>{message}</h1>}
    </div>
  )
}

export default Canvas;