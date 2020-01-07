import React from 'react';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';  

export default class Form extends React.Component {
    
    constructor(props) {
        super(props)
    }

    handleChange = (e) => {
        // Quando executa essa função, pega o contexto (this) que passei via props e muda-se o estado
        // Quando esse elemento muda o estado, está mudando o estado do contexto passamos via props (contexto pai).
        this.props.context.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // Aqui pegamos o contexto (this) que passamos no Main para esse elemento
        let context = this.props.context; 

        return (
            
            <Card className={useStyles.cardForm}>

                <CardContent>
                    <Typography className={useStyles.title} color="textSecondary" gutterBottom>
                        SIGNATURE INFORMATION
                    </Typography>
                    <form className={useStyles.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Full Name" value={context.state.fullname} name="fullname" onChange={(e)=>this.handleChange(e)} />
                        <TextField id="standard-basic" label="Office" value={context.state.office} name="office"  onChange={(e)=>this.handleChange(e)} />
                        <TextField id="standard-basic" label="Site" value={context.state.site} name="site"  onChange={(e)=>this.handleChange(e)} />
                        <TextField id="standard-basic" label="Phone" value={context.state.phone} name="phone"  onChange={(e)=>this.handleChange(e)} />

                        <TextField id="standard-basic" label="Instagram" />
                        <TextField id="standard-basic" label="Github" />
                        <TextField id="standard-basic" label="Linkedin" />
                        <TextField id="standard-basic" label="Twitter" />
                    </form>
                </CardContent>

            </Card>                                 
        ); 
    }
}  

const useStyles = {
    
    title: {
        fontSize: 14,
    },
    cardForm: {
        minWidth: 225,
        maxWidth: 1200,
        margin: '20px 5% 20px 5% !important',//top right bottom left
    },
}
