import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
        maxWidth: 1200,
        margin: '20px 5% 20px 5% !important',
    },       
}));


export default class SignatureInfo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (e) => {
        this.props.context.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let context = this.props.context; 
        
        return (            
            <Card className={useStyles.cardForm}>
                <CardContent>
                    <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                        INFORMATION  
                    </Typography>
                    <form className={useStyles.root} noValidate autoComplete="off">
                        <TextField 
                            id="standard-basic" label="Full Name" 
                            value={context.state.fullname} name="fullname" 
                            onChange={(e)=>this.handleChange(e)} 
                        />
                        <TextField id="standard-basic" label="Office" 
                            value={context.state.office} name="office"  
                            onChange={(e)=>this.handleChange(e)}
                        />
                        <TextField id="standard-basic" label="Site" 
                            value={context.state.site} name="site"  
                            onChange={(e)=>this.handleChange(e)} 
                        />
                        <TextField id="standard-basic" label="Phone" 
                            value={context.state.phone} name="phone"  
                            onChange={(e)=>this.handleChange(e)} 
                        /><br/>
                        <TextField id="standard-basic" label="Instagram"/>
                        <TextField id="standard-basic" label="Github" />
                        <TextField id="standard-basic" label="Linkedin" />
                        <TextField id="standard-basic" label="Twitter" />
                    </form>
                </CardContent>
            </Card>                                 
        ); 
    }
}  
