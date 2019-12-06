import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';  
import Button from '@material-ui/core/Button';  

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
    cardTutorials: {
        minWidth: 225,
        maxWidth: 1200,
        margin: '20px 5% 30px 5%', //top right bottom left 
    },       
  }));

export default function Tutorials() {

    const classes = useStyles(); 

    return (
        <Card className={classes.cardTutorials}> 
            <CardContent>          
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    SIGNATURE TUTORIALS
                </Typography>          
                <CardActions>
                    <Button variant="contained" color="secondary">
                        Outlook
                    </Button>
                    <Button variant="contained" color="secondary">
                        Gmail
                    </Button> 
                </CardActions>
            </CardContent>
        </Card>
    );
}