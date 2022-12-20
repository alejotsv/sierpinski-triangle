import React from 'react';
import Canvas from './components/Canvas';

const App = () => {
  let dimension_y = window.innerHeight/1.6;  
  let dimension_x;
  if (window.innerWidth<dimension_y){
    dimension_x = window.innerWidth;
  } else {
    dimension_x = dimension_y;
  }

  return(
    <div className='app'>
     <Canvas height={dimension_y} width={dimension_x} />
    </div>
  )
}

export default App;