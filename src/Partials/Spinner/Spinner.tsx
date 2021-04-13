import IconButton from '@material-ui/core/IconButton';
import LoopIcon from '@material-ui/icons/Loop';

import './spinner.css';

function Spinner(){
    return (
        <IconButton aria-label="settings">
            <LoopIcon id="spinner" fontSize="large"/>
        </IconButton>
    )
}

export default Spinner;