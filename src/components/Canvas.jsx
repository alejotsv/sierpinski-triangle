import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Canvas = (props) => {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);    
  const [sliderValue, setSliderValue] = useState(1000);
  let [dotNum, setDotNum] = useState(0);  

  // Variables for random dots
  let x;
  let y;

  const canvasRef = useRef(null);

  // Add initial text
  useEffect( () => {
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');    
    let textX = 30;
    let textY = height/4;
    ctx.font = '14px sans-serif';

    ctx.fillText('Discover what pattern is created by drawing ', textX, textY);
    textY += 20;
    ctx.fillText('consecutive dots, following this set of rules.', textX, textY);
    textY += 40;
    ctx.fillText('1. Three dots are drawn to create a triangle', textX, textY);
    textY += 20;
    ctx.fillText('2. A random dot is created inside the triangle (current dot)', textX, textY);
    textY += 20;
    ctx.fillText('3. One of the original three dots is selected randomly', textX, textY);
    textY += 20;
    ctx.fillText('4. A new dot is drawn halfway between the current dot', textX, textY);
    textY += 20;
    ctx.fillText('   and the dot selected in step 3', textX, textY);
    textY += 20;
    ctx.fillText('5. The dot drawn in step 4 becomes \'current dot\'', textX, textY);
    textY += 40;
    ctx.fillText('Steps 3, 4, and 5 are repeated', textX, textY);
    textY += 20;
    ctx.fillText('until the number of dots you select are drawn', textX, textY);
    textY += 40;
    ctx.fillText('Now select how many dots you wish to draw', textX, textY);
    textY +=20;
    ctx.fillText('by moving the slider bar,', textX, textY);
    textY +=20;
    ctx.fillText('click on Draw Dots, and enjoy!', textX, textY);
  }, []);



  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotNum = 0;
    setDotNum(dotNum);
  }

  const drawTriangles = () => {    
    clear();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set base coordinates
    const vertice = width/2;
    const top_space = height/60;
    const side_space = width/12;

    const firstDot = [vertice, top_space];
    const secondDot = [side_space, height-side_space];
    const thirdDot = [width-side_space, height-side_space];

    // Draw dots on base coordinates    
    drawDot(firstDot[0], firstDot[1]);
    drawDot(secondDot[0], secondDot[1]);
    drawDot(thirdDot[0], thirdDot[1]);

     // Establish triangle boundaries for the random dot
     ctx.beginPath();
     ctx.moveTo(firstDot[0], firstDot[1]);
     ctx.lineTo(secondDot[0], secondDot[1]);
     ctx.lineTo(thirdDot[0], thirdDot[1]);
     ctx.closePath();
    
    // Draw random dot inside the triangle
    x = Math.floor(Math.random() * width); // Generate a random x coordinate
    y = Math.floor(Math.random() * height); // Generate a random y coordinate

    let isDrawn = false;

    while(!isDrawn){
      if (ctx.isPointInPath(x, y)) { // Test if the point is inside the triangle
        console.log('x: ' + x + ' y: ' + y + ' is inside the triangle');
        drawDot(x, y);
        isDrawn = true;        
      } else {
        console.log('x: ' + x + ' y: ' + y + ' is outside the triangle');
        x = Math.floor(Math.random() * width); // Generate a new random x coordinate
        y = Math.floor(Math.random() * height); // Generate a new random y coordinate        
      }      
    }

    let originalDot;
    let middleDot;
    let newDot = [x, y];
    let totalNumberOfDots = setNumberOfDots();      

    const handleLoop = () => {
      let i = 0;
      while (i < totalNumberOfDots) {
        setTimeout(() => {
          originalDot = randomOriginalDot(firstDot,secondDot,thirdDot);
          middleDot = getMidCoordinates(originalDot, newDot);
          drawDot(middleDot[0], middleDot[1])
          dotNum++;
          setDotNum(dotNum);
          newDot = middleDot;
        }, i * 10);  // delay each iteration by 0.01 seconds
        i++;
      }
    }

    handleLoop();
    
  }

  const drawDot = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const randomOriginalDot = (first, second, third) => {
    let ran = Math.floor(Math.random() * 3) + 1;

    switch(ran){
      case 1:
        return first;
        break;
      case 2:
        return second;
        break;
      case 3:
        return third;
        break;
    }
  }

  const stopDrawing = () => {
    console.log('To add button to stop drawing');
  }

  const getMidCoordinates = (pointOne, pointTwo) => {
    let middle = [];
    let x = (pointOne[0] + pointTwo[0])/2;
    let y = (pointOne[1] + pointTwo[1])/2;

    middle.push(x);
    middle.push(y);    

    return middle;
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  }

  const setNumberOfDots = () => {
    let num = sliderValue;
    return num;
  }


  return(
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <canvas className="canvas" ref={canvasRef} width={width} height={height} />
      
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Slider style={{margin:'0px', width:'250px'}}
          value={sliderValue}
          onChange={handleSliderChange}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"                   
          min={0}
          max={25000}
        />

      </Box>

      <Box>
        <Button style={{margin:'20px', width:'170px'}}
                variant="contained"                
                onClick={drawTriangles}>
                  Draw Dots</Button>

        <Button style={{margin:'20px', width:'170px'}}
                variant="contained"
                onClick={clear}>
                  Clear</Button>
      </Box>
      
      <h2>Dots drawn: {dotNum}</h2>      
    </Box>
  )
}

export default Canvas;