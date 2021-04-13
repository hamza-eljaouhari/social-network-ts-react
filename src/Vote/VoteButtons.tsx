import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, { useEffect } from 'react';
import votesApi from '../api/votes';

interface VoteButtonsProps {
    postId: number,
    vote: any,
    setVote: any
}
  
function VoteButtons(props: VoteButtonsProps){

    const { postId, vote, setVote } = props;
    
    function registerVote(upOrDown: number){
        votesApi.vote({
            up_or_down: upOrDown,
            subject_id: postId,
            subject_type: 'posts'
        }).then((response) => {

            setVote({
                upOrDown: upOrDown,
                postId: postId,
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    function getThumbDownButton(){
        if(vote.upOrDown !== -1){
            return(
                <IconButton color="default" onClick={() => registerVote(-1)} aria-label="downvoted">
                    <ThumbDownIcon></ThumbDownIcon>
                </IconButton>
            )
        }

        return(
            <IconButton color="primary" onClick={() => registerVote(-1)} aria-label="downvoted">
                <ThumbDownIcon></ThumbDownIcon>
            </IconButton>
        )
    }
         
    function getThumbUpButton(){
        if(vote.upOrDown !== 1){
            return(
                <IconButton color="default" onClick={() => registerVote(1)} aria-label="downvoted">
                    <ThumbUpIcon></ThumbUpIcon>
                </IconButton>
            )
        }

        return(
            <IconButton color="primary" onClick={() => registerVote(1)} aria-label="upvoted">
                <ThumbUpIcon></ThumbUpIcon>
            </IconButton>
        )
    }

    return (
        <>
            {
                getThumbDownButton()
            }
            {
                getThumbUpButton()
            }
        </>
    )
}

export default VoteButtons;