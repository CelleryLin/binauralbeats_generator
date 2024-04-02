import React, { useState } from 'react'

import Box from '@mui/system/Box';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';


export default function Fqslider(props) {

    const fqmin = 0;
    const fqmax = 100;
    const vol = props.vol;

    
    // props.osc.play();
    

    const handleSliderChange = (event, newValue) => {
        props.setVol(newValue);
    };

    const handleInputChange = (event) => {
        let val = event.target.value;
        props.setVol(val);
    };

    const handleBlur = () => {
        if (vol < fqmin) {
            setVol(fqmin);
        } else if (vol > fqmax) {
            setVol(fqmax);
        }
    };

    return (
        <div className='fqinput'>
            <p className='mar10'>{props.channel}</p>
            <Slider
                className={'num-slider ' + props.channel}
                value={typeof vol === 'number' ? vol : fqmin}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                valueLabelDisplay="auto"
                min={fqmin}
                max={fqmax}
                step={0.01}
            />
            <Input
                className={'num-input' + props.channel}
                value={vol}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    step: 0.01,
                    min: fqmin,
                    max: fqmax,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
        </div>
    );
}