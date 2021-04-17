import React from "react";
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Toolbar from '@material-ui/core/Toolbar';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorIcon from '@material-ui/icons/Error';

import SelectCommunity from "../Partials/SelectCommunity/Selectcommunity";
import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;

const options = [
    {
        name: "Heading 1",
        heading: "<h1>",
        tag: <h1>Heading 1</h1>
    },
    {
        name: "Heading 2",
        heading: "<h2>",
        tag: <h2>Heading 2</h2>
    },
    {
        name: "Heading 3",
        heading: "<h3>",
        tag: <h3>Heading 3</h3>
    },
    {
        name: "Heading 4",
        heading: "<h4>",
        tag: <h4>Heading 4</h4>
    },
    {
        name: "Heading 5",
        heading: "<h5>",
        tag: <h5>Heading 5</h5>
    },
    {
        name: "Heading 6",
        heading: "<h6>",
        tag: <h6>Heading 6</h6>
    },
    {
        name: "Paragraph",
        heading: "<p>",
        tag: <p>Paragraph</p>
    }
];


const useStyles = makeStyles({
    leftToolbar: {
        marginLeft: "auto",
        lineHeight: "75px"
    }
});

function EditorToolbar(props: any){
    const classes = useStyles();
    
    const { isLoading, communityId, setCommunityId, isSaved, savePost} = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const showHeadings = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseTitleMenu = () => {
        setAnchorEl(null);
    };
    
    var status = null
    
    function formatAlignLeft(){
        document.execCommand("justifyLeft", false, undefined);
    }

    function formatAlignCenter(){
        document.execCommand("justifyCenter", false, undefined);
    }

    function formatBold(){
        document.execCommand("bold", false, undefined);
    }

    function formatLink(){
        let url = prompt("Enter the link here: ", "http:\/\/") || undefined;
        document.execCommand("createLink", false, url);
    }

    function formatHeading(heading: string | undefined){
        document.execCommand("formatBlock", false, heading);
        handleCloseTitleMenu();
    }

    if(isLoading){
        status = (
            <Button variant="contained" color="primary">
                Saving...
            </Button>
        );
    }else{
        if(isSaved){
            status = (
                <>
                    <Button onClick={savePost} variant="contained" color="primary">
                        Save
                        <SaveIcon></SaveIcon>
                    </Button>
                </>
            );
        }else{
            status = (
                <>
                    <Button variant="contained" color="primary">
                        Unauthorized to save
                        <ErrorIcon></ErrorIcon>
                    </Button>
                </>
            );
        }
    }

    return (
        <Toolbar >
            <IconButton onClick={formatAlignLeft} aria-label="format align left" color="inherit">
                <FormatAlignLeftIcon />
            </IconButton>
            <IconButton onClick={formatAlignCenter} aria-label="format align center" color="inherit">
                <FormatAlignCenterIcon />
            </IconButton>
            <IconButton onClick={formatBold} aria-label="format bold" color="inherit">
                <FormatBoldIcon/>
            </IconButton>
            <IconButton onClick={formatLink} aria-label="create link" color="inherit">
                <LinkIcon/>
            </IconButton>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={showHeadings}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted 
                open={open}
                onClose={handleCloseTitleMenu}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.name} selected={option.name === 'Heading 1'} onClick={() : void => formatHeading(option.heading)}>
                        {option.tag}
                    </MenuItem>
                ))}
            </Menu>
            <div className={classes.leftToolbar}>
                <SelectCommunity communityId={communityId} setCommunityId={setCommunityId}></SelectCommunity>
                {
                    status
                }
            </div>
        </Toolbar>
    )
}

export default EditorToolbar;