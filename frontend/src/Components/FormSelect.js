import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormSelect({ state, inputHandler, filterArray, filterValues, index }) {

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // }

    return (
        <>
            <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">{filterValues[index].title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label={filterValues[index].title}
                    onChange={inputHandler}
                >
                {
                    filterArray.map((value, index) => (
                        <MenuItem value={`${value}`}>{value}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText>{filterValues[index].helperText}</FormHelperText>
        </FormControl >
        </>
    );
}
