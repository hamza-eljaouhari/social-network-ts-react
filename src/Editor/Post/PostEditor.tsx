import Editor from "../../Partials/Editor/Editor";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

const useStyles = makeStyles({
    root: {
        
    },
});
  
function PostEditor(){
    const classes = useStyles();
    const [editMode, setEditMode] = React.useState<boolean>(false);

    return(
        <section >
            <article>
                <Editor></Editor>
            </article>
        </section>
    )
}

export default PostEditor;