import Button from '@material-ui/core/Button';

interface EditButtonProps {
    setEditMode: any,
    editMode: boolean
}

function EditButton(props : EditButtonProps){
    
    function handleClick(){
        props.setEditMode(true);
    }

    return (
        <Button onClick={handleClick} variant="contained" color="primary" disableElevation>
            Edit
        </Button>
    );
}

export default EditButton;