import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';

import {
    Link
  } from "react-router-dom";

  
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: "50px auto"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    form: {
        '& > *': {
            marginTop: theme.spacing(1),
            width: "100%",
        }
    },
    registerLink: {
        float: "right" 
    },
  })
);

interface FormData {
    formTitle: string,
    formText: string,
    routeText: string,
    routePath: string,
    children: React.ReactNode,
    cardImageHeader: string
}

function AuthenticationForm(props: FormData) {
    const classes = useStyles();
    const { formTitle, formText, routeText, routePath, children, cardImageHeader } = props;
    return (
        <Card className={classes.root}>
        <CardHeader
            title={formTitle}
            align="left"
            titleTypographyProps={{ "component": "h6", variant: "h6"}}
        />
        <CardMedia
            className={classes.media}
            image={cardImageHeader}
            title="The Simpsons Welcome You"
        />
        <CardContent>
            <Typography variant="h6" align="left" component="h6" >
                { formText }
            </Typography>
            { children }
        </CardContent>
        <CardActions>
            <IconButton aria-label="forgot password">
            <HelpIcon />
            </IconButton>
            
            <Link to={routePath}>
                <Typography right-align component="h6">
                    { routeText }
                </Typography>
            </Link>
        </CardActions>
        </Card>
    );
}

export default AuthenticationForm;

