import React from 'react';
import Canvas from './components/Canvas';
import Button from './components/Button';

const App = () => {
  return(
    <div className='app'>
     <Canvas />
     <Button btn='Draw' />
     <Button btn='Clear'/>
    </div>
  )
}

export default App;