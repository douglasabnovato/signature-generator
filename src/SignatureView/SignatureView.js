import React from 'react'; 

import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';  
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const classes =  {
    root: {
        width: 300,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    bullet: {
        display: 'inline-block !important',
        margin: '0 2px !important',
        transform: 'scale(0.8) !important',
    },
    cardSignature: {
        width: 300,
        minHeight: 170,
        margin: '10px 20px 22px 30% !important',
    },
};

export default class SignatureView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let context = this.props.context;

        return (
            <Card className={classes.cardSignature}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        SIGNATURE DEMO
                    </Typography>
                    <Typography variant="h5" component="h2" >
                        {context.state.fullname}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {context.state.office}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {context.state.phone}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {context.state.site}
                    </Typography>
                    <Typography className={classes.root}>
                        <Link href="#">
                            <InstagramIcon />
                        </Link>
                        <Link href="#">
                            <LinkedInIcon />
                        </Link>
                        <Link href="#">
                            <TwitterIcon />
                        </Link>
                        <Link href="#">
                            <GitHubIcon />
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

