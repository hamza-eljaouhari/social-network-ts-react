import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import communitiesApi from "../../api/communities";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import handleError from "../../utils/handleError";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function SelectCommunity(props: any){
    const classes = useStyles();

    const [communities, setCommunities] = React.useState<any>([]);

    useEffect(() => {
        fillSelectOptions()
    }, []);

    function fillSelectOptions(){
        communitiesApi.getAll().then((response) => {
            console.log(response);
            setCommunities(response.data.rows);
        }).catch((error) => {
            handleError(error);
        })
    }

    const handleChange = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        props.setCommunityId(event.target.value)
    };
    
    return (
        <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-native-required">Age</InputLabel>
            <Select
            native
            value={props.communityId}
            onChange={handleChange}
            name="community"
            inputProps={{
                id: 'name-native-required',
            }}
            >
            <option aria-label="Uncategorized" value="0">Unacategorized</option>
            {
                communities.map((community: {id: number, title: string, postCount: number}) => {
                    return <option key={community.id} value={community.id}>{community.title}</option>
                })
            }
            </Select>
            <FormHelperText>Required</FormHelperText>
        </FormControl>
    )
}

export default SelectCommunity;