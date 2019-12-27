import React from 'react'; 

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card'; 

import Form from '../Form/Form';
import Signature from '../Signature/Signature';
import Tutorials from '../Tutorials/Tutorials'; 

import ButtonAppBar from '../ButtonAppBar/ButtonAppBar'; 

export default class Main extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    } 

    // Nesse caso, eu passo o mesmo contexto para os elementos que 
    // queremos manipular, por isso, ao invés de manipular o 
    // state do componente, pegamos e manipulamos o do Pai (Main).

    render() {

        return ( 

            <div>
                <ButtonAppBar />
                
                <Card className={useStyles.card}>
                    
                    <Form context={this} />
                    <Signature context={this} />
                    <Tutorials />
                            
                </Card> 
            </div>  
                
        );
    }
} 

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
      minWidth: 225,
      maxWidth: 1300,
      margin: '5px 5px 5px 5px',//top right bottom left
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
