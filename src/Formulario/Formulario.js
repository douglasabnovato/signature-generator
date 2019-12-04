import React from 'react';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'; 

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
        margin: theme.spacing(2),
        width: 200,
        },
    },
    card: {
      minWidth: 225,
      maxWidth: 960,
      margin: '30px 8% 10% 8%',//top right bottom left
    },
    cardForm: {
        minWidth: 225,
        maxWidth: 960,
        margin: '20px 5% 5% 5%',//top right bottom left
      },
    cardSignature: {
        minWidth: 230,
        maxWidth: 400,
        minHeight: 170,
        margin: '5px 20px 22px 27%', //top right bottom left 
      },
    cardTutorials: {
        minWidth: 200,
        maxWidth: 860,
        margin: '20px 20px 30px 5%', //top right bottom left 
      },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));


export default function Formulario() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (

        <Card className={classes.card}>
            <Card className={classes.cardForm}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        SIGNATURE BLOCK GENERATOR
                    </Typography>  
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Nome Completo" />
                        <TextField id="standard-basic" label="Cargo" />
                        <TextField id="standard-basic" label="Telefone" />
                        <TextField id="standard-basic" label="Site" />
                    </form>
                </CardContent>
            </Card>
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
            <Card className={classes.cardTutorials}> 
                <CardContent>          
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        TUTORIALS
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
        </Card>
    );
}