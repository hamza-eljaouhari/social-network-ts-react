import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import votesApi from '../api/votes';
import handleError from "../utils/handleError";

interface VoteButtonsProps {
    postId: number,
    vote: any,
    setVote: any
}
  
function VoteButtons(props: VoteButtonsProps){

    const { postId, vote, setVote } = props;
    
    function registerVote(clickedUpOrDown: number){
        if(vote.upOrDown === clickedUpOrDown){
            addVote(0);
        }else{
            addVote(clickedUpOrDown);
        }
        
    }

    function addVote(clickedUpOrDown: number){
        votesApi.addVote({
            up_or_down: clickedUpOrDown,
            subject_id: postId,
            subject_type: 'posts'
        }).then((response) => {

            setVote({
                id: response.data.id,
                upOrDown: response.data.up_or_down,
                postId: response.data.subject_id,
                createdAt: response.data.createdAt
            });

        }).catch((error) => {
            handleError(error)
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