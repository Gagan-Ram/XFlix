import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormTextField({ filterValues, index, inputHandler }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-basic"
        label={filterValues[index].title}
        variant="outlined"
        helperText={filterValues[index].helperText}
        onChange={inputHandler}
      // type={filterArray ? "" : "DA"}
      />
    </Box>
  );
}

export function FormTextFieldDate({ filterValues, index, inputHandler }) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-basic"
        // label={filterValues[index].title}
        variant="outlined"
        helperText={filterValues[index].helperText}
        onChange={inputHandler}
        type='date'
      />
    </Box>
  );
}
