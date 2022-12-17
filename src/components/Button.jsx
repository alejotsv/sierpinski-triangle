import React from 'react';
import { useState } from 'react';

const Button = (props) => {
  const [btn, setBtn] = useState(props.btn);

  return(
    <button>{btn}</button>
  )
}

export default Button;