import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import postsApi from "../api/posts";
import handleError from '../utils/handleError';

import EditorToolbar from "./EditorToolbar";

import {
    withRouter
} from "react-router-dom";


const FONT_SIZE = 24;

const useStyles = makeStyles({
    contentEditable: {
        minHeight: 50,
        borderLeft: "1px solid rgba(0, 0, 0, 0.5)",
        textAlign: "left",
        outline: "none",
        marginBottom: 10,
        padding: "5px 30px",
        fontSize: FONT_SIZE,
        transition: "0.5s all",
        '&:hover': {
            background: "rgba(232, 232, 232, 0.25)",
        }
    },
    title: {
        fontSize: FONT_SIZE
    },
    content: {
        minHeight: 300,
        lineHeight: "32px",
        fontSize: FONT_SIZE
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

    const [isContentEditable, setIsContentEditable] = React.useState<boolean>(false);
    const [isTitleEditable, setIsTitleEditable] = React.useState<boolean>(false);
    
    const { entity } = props;

    const [id, setId] = React.useState<number>(1);
    const [title, setTitle] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [communityId, setCommunityId] = React.useState<number>(1);

    
    function handleTitleChange(event: React.FormEvent<HTMLDivElement>){
        setTitle(event.currentTarget.innerText);
    }

    function handleContentChange(event: React.FormEvent<HTMLDivElement>){
        setContent(event.currentTarget.innerHTML);
    }

    useEffect(() => {
        const contentDiv = document.getElementById("content");
        const titleDiv = document.getElementById("title");

        if(contentDiv) contentDiv.innerHTML = entity.content || "";
        if(titleDiv) titleDiv.innerText = entity.title || "";
        console.log("entitit" ,entity)
        setId(entity.id);
        setTitle(entity.title);
        setContent(entity.content);
        setCommunityId(entity.communityId || entity.id)
    }, [entity])

    function savePost(){
        setIsLoading(true);

        const post = {
            id: id,
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

    return(
        <article>
            <EditorToolbar 
                isSaved={isSaved}
                isLoading={isLoading}
                communityId={communityId}
                setCommunityId={setCommunityId}
                savePost={savePost}
                ></EditorToolbar>
            <div 
                id="title"
                onMouseOver={editTitle}
                ref={titleRef}
                onInput={handleTitleChange}
                className={`${classes.contentEditable} ${classes.title}`} contentEditable={isTitleEditable}
                onKeyDown={focusOnContentOrDeleteTitleCharacters}
                suppressContentEditableWarning={true}>
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