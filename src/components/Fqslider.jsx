import React, { useState, useRef } from 'react'

import Box from '@mui/system/Box';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';


export default function Fqslider(props) {

    const fqmin = 10;
    const fqmax = 20000;
    const freq = props.freq;
    

    const handleSliderChange = (event, newValue) => {
        props.setFreq(newValue);
    };

    const handleInputChange = (event) => {
        let val = event.target.value;
        props.setFreq(val === '' ? fqmin : Number(val));
    };

    const handleBlur = () => {
        if (freq < fqmin) {
            props.setFreq(fqmin);
        } else if (freq > fqmax) {
            props.setFreq(fqmax);
        }
    };

    return (
        <div className='fqinput'>
            <p style={{margin: '10px'}}>{props.channel}</p>
            <Slider
                className={'num-slider ' + props.channel}
                value={typeof freq === 'number' ? freq : fqmin}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                valueLabelDisplay="auto"
                min={fqmin}
                max={fqmax}
            />
            <Input
                className={'num-input' + props.channel}
                value={freq}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    step: 1,
                    min: fqmin,
                    max: fqmax,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
        </div>
    );
}