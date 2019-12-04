import React from 'react';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';  

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(4),
            width: 300,
        },
    },
    title: {
        fontSize: 14,
    },
    cardForm: {
        minWidth: 225,
        maxWidth: 960,
        margin: '20px 5% 20px 5%',//top right bottom left
    },       
  }));


export default function Form() {

    const classes = useStyles();

    return (
        
        <Card className={classes.cardForm}>

            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    SIGNATURE INFORMATION
                </Typography>  
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Full Name" />
                    <TextField id="standard-basic" label="Office" /><br/>
                    <TextField id="standard-basic" label="Telephone" />
                    <TextField id="standard-basic" label="Site" />
                </form>
            </CardContent>

        </Card>            
        
    );
}