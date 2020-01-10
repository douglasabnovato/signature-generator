import React from 'react'; 


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
    cardOutlook: {
        minWidth: 225,
        maxWidth: 900,
        margin: '20px 5% 30px 10%', //top right bottom left 
    },       
}));

export default function TutOutlook() {

    const classes = useStyles(); 

    return (
        <Card className={classes.cardOutlook}> 

            <CardContent>   
                    <Typography variant="h5" component="h2" >
                        TUTORIAL Outlook 
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Primeiro
                    </Typography>                    
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Segundo
                    </Typography>
            </CardContent>

        </Card>
    );
}
