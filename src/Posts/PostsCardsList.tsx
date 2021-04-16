import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import PostCard from "./PostCard";
import postsApi from "../api/posts";

import Spinner from "../Partials/Spinner/Spinner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{ 
    },
  }),
);

function PostsCardsList(){
    const classes = useStyles();
    const [posts, setPosts] = React.useState<any>([]);

    function setVote(vote: any){
      const newPosts = posts.map((post: any) => {
        if(post.id === vote.postId){
          var newPost = {...post};

          newPost.vote = {
            id: vote.id,
            upOrDown: vote.upOrDown,
            createdAt: vote.createdAt
          };

          console.log("newPost", newPost)

          return newPost;
        }

        return post;
      })

      setPosts(newPosts);
    }

    useEffect(() => {
      postsApi.getAllPosts().then((response) =>{
        setPosts(response.data.posts);
      }).catch((error) => {
        console.log(error);
      })
    }, [])

    if(posts.length){
      return (
          <section className={classes.root}>
            { 
              posts.map((post: any) => {
                return <PostCard
                          setVote={setVote}
                          key={post.id} 
                          post={post}
                        ></PostCard>
              })
            }
          </section>
      );
    }

    return (
      <section>
        <Spinner></Spinner>
      </section>
    )
}

export default PostsCardsList;