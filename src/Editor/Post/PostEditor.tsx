import Editor from "../../Partials/Editor/Editor";
import React, { useEffect } from "react";

import postsApi from "../../api/posts";
import handleError from "../../utils/handleError";

import {
    withRouter 
} from "react-router-dom";

function PostEditor(props: any){

    const [post, setPost] = React.useState<any>({});
    
    function getPost(){
        const { id } = props.match.params;
        alert(id)
        postsApi.geptById(id).then((response) => {
            console.log(response.data);
            setPost(response.data);
            console.log("post", post)
        }).catch((error) => {
            handleError(error);
        })
    }

    useEffect(() => {
        getPost();
    }, [props.match.params.id])

    return(
        <section >
            <article>
                <Editor entityType="posts" entity={post} ></Editor>
            </article>
        </section>
    )
}

export default withRouter(PostEditor);