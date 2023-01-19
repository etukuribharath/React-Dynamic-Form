import React from 'react';
import './style.css';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SizeCheckboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked size="small" />
      <Checkbox {...label} defaultChecked />
      <Checkbox
        {...label}
        defaultChecked
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
    </div>
  );
}
export default function Form(props) {

  
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
