import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';  

import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import GitHubIcon from '@material-ui/icons/GitHub';

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
        margin: '5px 20px 22px 30%', //top right bottom left 
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
                <LinkedInIcon/> <FacebookIcon /> <WhatsAppIcon /> <TwitterIcon/><InstagramIcon />  <PinterestIcon/> <GitHubIcon />
            </CardContent>
        </Card> 

    );
}