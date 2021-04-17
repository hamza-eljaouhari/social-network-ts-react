import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Toolbar from '@material-ui/core/Toolbar';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect } from "react";
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import postsApi from "../api/posts";
import handleError from '../utils/handleError';
import ErrorIcon from '@material-ui/icons/Error';

import {
    withRouter
} from "react-router-dom";

import SelectCommunity from "../Partials/SelectCommunity/Selectcommunity";

const fontSize = 24;
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
    contentEditable: {
        minHeight: 50,
        borderLeft: "1px solid rgba(0, 0, 0, 0.5)",
        textAlign: "left",
        outline: "none",
        marginBottom: 10,
        padding: "5px 30px",
        fontSize: fontSize,
        transition: "0.5s all",
        '&:hover': {
            background: "rgba(232, 232, 232, 0.25)",
        }
    },
    title: {
        fontSize: 28
    },
    content: {
        minHeight: 300,
        lineHeight: "32px",
        fontSize: fontSize
    },
    editingToolbar: {
        transition: "0.5s all"
    },
    leftToolbar: {
        marginLeft: "auto",
        lineHeight: "75px"
    }
});
  
function Editor(props: any){
    const classes = useStyles();

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isSaved, setIsSaved] = React.useState<boolean>(true);

    var contentRef = React.createRef<HTMLDivElement>();
    var titleRef = React.createRef<HTMLDivElement>();
    const toolbarRef = React.createRef<HTMLInputElement>();

    const [isContentEditable, setIsContentEditable] = React.useState<boolean>(false);
    const [isTitleEditable, setIsTitleEditable] = React.useState<boolean>(false);
    
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [communityId, setCommunityId] = React.useState<number>(1);
    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const showHeadings = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseTitleMenu = () => {
        setAnchorEl(null);
    };
    
    function handleTitleChange(event: React.FormEvent<HTMLDivElement>){
        setTitle(event.currentTarget.innerText);
    }

    function handleContentChange(event: React.FormEvent<HTMLDivElement>){
        setContent(event.currentTarget.innerHTML);
    }

    useEffect(() => {
        const contentDiv = document.getElementById("content");
        setContent(props.entity.content);
        if(contentDiv) contentDiv.innerHTML = props.entity.content || "";
        setCommunityId(props.entity.communityId);
    }, [props.entity])

    function savePost(){
        setIsLoading(true);

        const post = {
            id: props.entity.id,
            title: title,
            content: content,
            community_id: communityId
        };

        postsApi.edit(post).then((response) => {
            setIsSaved(true);
        }).catch((error) => {
            handleError(error);
            setIsSaved(false);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    function editContent(): void{
        setIsContentEditable(true)
    }

    function onBlurContent(): void{
        setIsContentEditable(false)
    }
    
    function editTitle(): void{
        setIsTitleEditable(true)
    }

    function onBlurTitle(): void{
        setIsTitleEditable(false)
    }

    function focusOnContentOrDeleteTitleCharacters(event: React.KeyboardEvent<HTMLElement>) : void{

        if(event.key === "Enter" || event.key === "Tab"){
            setIsContentEditable(true)
            contentRef?.current?.focus();
            event.preventDefault();
        }

        if(event.currentTarget.innerText.length > 20 && event.key != "Backspace"){
            event.preventDefault();
        }
    }

    function returnToTitleFromContent(event: React.KeyboardEvent<HTMLElement>) : void{
        const contentText = contentRef?.current?.textContent;

        var contentBoxHasText = false;

        if(contentText){
            contentBoxHasText = contentText.length > 0;
        }

        if(event.key === "Backspace" && !contentBoxHasText){
            setIsTitleEditable(true);
            titleRef?.current?.focus();
            event.preventDefault();
        }
    }

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

    var status = null

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

    return(
        <article>
            <Toolbar ref={toolbarRef}>
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
{
    communityId
}
            </Toolbar>
            <div id="title"
                onMouseOver={editTitle}
                ref={titleRef}
                onInput={handleTitleChange}
                className={`${classes.contentEditable} ${classes.title}`} contentEditable={isTitleEditable}
                onKeyDown={focusOnContentOrDeleteTitleCharacters}
                suppressContentEditableWarning={true}>
                    {
                        props.entity.title
                    }
            </div>
            
            <div id="content"
                onMouseOver={editContent} 
                onInput={handleContentChange}
                className={`${classes.contentEditable} ${classes.content}`} 
                contentEditable={isContentEditable}
                ref={contentRef}
                onKeyDown={returnToTitleFromContent}
                >
            </div>
        </article>
    );
}

export default withRouter(Editor);