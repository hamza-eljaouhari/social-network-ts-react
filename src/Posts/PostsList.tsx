import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Post from "./Post";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap"
    },
  }),
);



function PostsList(){
    const classes = useStyles();

    return (
        <section className={classes.root}>
            {
                [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((id) => {
                    return <Post key={id}></Post>
                })
            }
        </section>
    );
}

export default PostsList;