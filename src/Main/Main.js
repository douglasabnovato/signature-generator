import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card'; 

import Form from '../Form/Form';
import Signature from '../Signature/Signature';
import Tutorials from '../Tutorials/Tutorials'; 

import ButtonAppBar from '../ButtonAppBar/ButtonAppBar';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
      minWidth: 225,
      maxWidth: 960,
      margin: '30px 8% 10% 8%',//top right bottom left
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})); 

export default function Main() {

    const classes = useStyles();

    return ( 
        <div>    
            <ButtonAppBar />
            
            <Card className={classes.card}>
                <Form />
                <Signature />
                <Tutorials />           
            </Card> 
        </div>  
               
    );
} 