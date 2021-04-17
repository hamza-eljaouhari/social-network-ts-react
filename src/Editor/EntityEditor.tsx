import React, { useEffect } from "react";

import postsApi from "../api/posts";
import communitiesApi from "../api/communities";
import handleError from "../utils/handleError";
import Editor from "./Editor";

import {
    withRouter 
} from "react-router-dom";

function PostEditor(props: any){

    const [entity, setEntity] = React.useState<any>({});

    function getPost(id: number){
        postsApi.getById(id).then((response) => {
            setEntity(response.data);
            console.log("reeeeeeeees posts", response.data)
        }).catch((error) => {
            handleError(error);
        })
    }

    function getCommunity(id: number){
        communitiesApi.getById(id).then((response) => {
            setEntity(response.data);
            console.log("reeeeeeeees comm", response.data)
        }).catch((error) => {
            handleError(error);
        })
    }

    function getEntity(){
        const { id } = props.match.params;

        if(props.entityType === "posts"){
            getPost(id);
        }else{
            getCommunity(id);
        }
    }

    useEffect(() => {
        getEntity();
        console.log(props.match.params.id + "         id")
    }, [props.match.params.id])

    return(
        <section >
            <article>
                <Editor entity={entity} ></Editor>
            </article>
        </section>
    )
}

export default withRouter(PostEditor);