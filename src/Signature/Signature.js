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
    pos: {
        marginBottom: 12,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    }, 
    cardSignature: {
        minWidth: 230,
        maxWidth: 400,
        minHeight: 170,
        margin: '5px 20px 22px 27%', //top right bottom left 
    },      
  }));

export default function Signature() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (

        <Card className={classes.cardSignature}>
            <CardContent>  
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    SIGNATURE EXAMPLE
                </Typography>                  
                <Typography variant="h5" component="h2">
                    John{bull}
                    Doe{bull}
                    Van{bull}
                    Schwarzenegger
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Digital Marketing Manager
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    +55 32 98888-7777
                </Typography>
                <Typography variant="body2" component="p">
                    www.johndoe.google.com
                </Typography>
            </CardContent>
        </Card> 
        
    );
}