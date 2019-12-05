import React from 'react'; 

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'; 

class FormComp extends React.Component {

    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            fullname: ""
        };
        this.handleFNameChange = (evento) => {
            this.setState({
                firstname: evento.target.value
            });
        };
        this.handleLNameChange = (evento) => {
            this.setState({
                lastname: evento.target.value
            });
        };
        this.handleClick = () => {
            const name = this.state.firstname + ' ' + this.state.lastname
            this.setState({fullname: name})
        };
    }

    render(){                

        return (
            
            <div>
                <Card>

                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            SIGNATURE INFORMATION
                        </Typography>  
                        <form noValidate autoComplete="off">
                            <TextField 
                                id="standard-basic" 
                                label="Full Name" 
                                value={this.state.firstname}
                                onChange={this.handleFNameChange}  />
                            <TextField 
                                id="standard-basic" 
                                label="Office" 
                                value={this.state.lastname}
                                onChange={this.handleLNameChange} /><br/>
                            <TextField id="standard-basic" label="Telephone" />
                            <TextField id="standard-basic" label="Site" />
                            <hr /> 
                            <input type="button" value="Submit" onClick={this.handleClick} />
                            <hr /> 
                            <h3>Your full name is {this.state.firstname}{this.state.lastname} </h3>
                            <hr /> 
                            <h3>Your full name is {this.state.fullname} </h3>
                        </form>
                    </CardContent>

                </Card>
                
                
            </div>

        );

    }

}

export default FormComp;