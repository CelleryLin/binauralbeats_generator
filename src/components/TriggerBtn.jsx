import React, {useRef} from 'react'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default function TriggerBtn(props) {
    const [oscstate, setOscstate] = React.useState('stop');

    const handleState = (event, newstate) => {
        if (newstate !== null) {
            setOscstate(newstate);
            props.handleState(event, newstate);
        }
    };
    return (
        <div style={
            {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }
        
        }>
            <ToggleButtonGroup
            className='trigger-btn'
            value={oscstate}
            exclusive
            onChange={handleState}
            aria-label="osc state"
        >
            <ToggleButton value="play" aria-label="play">
                <PlayArrowIcon />
            </ToggleButton>
            <ToggleButton value="stop" aria-label="stop">
                <StopIcon />
            </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup>
        <ToggleButton value="check" onChange={props.set2def}>
            <RestartAltIcon />
        </ToggleButton>
        <ToggleButton value="check" onChange={props.add2bookmark}>
            <BookmarkAddIcon />
        </ToggleButton>

        </ToggleButtonGroup>
        
        </div>
        
    )
}
