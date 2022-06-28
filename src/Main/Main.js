import React from 'react'; 

import Card from '@material-ui/core/Card'; 

import Form from '../Form/Form';
import Signature from '../Signature/Signature';

import ButtonAppBar from '../ButtonAppBar/ButtonAppBar'; 

export default class Main extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {

        }
    } 

    //Repara como eu to passando o this (que é o contexto da Main)
    //Eu passo o this via props para poder manipular tanto o 
    //state como outras coisas dentro dos componentes

    render() {

        return ( 

            <div>
                <ButtonAppBar />
                
                <Card className={useStyles.card}>
                    
                    <Form context={this} />
                    {
                        // Nesse caso, eu passo o mesmo contexto para os elementos que 
                        // queremos manipular, por isso, ao invés de manipular o 
                        // state do componente, pegamos e manipulamos o do Pai (Main).
                    }
                    <Signature context={this} />
                            
                </Card> 
            </div>  
                
        );
    }
} 

const useStyles = (theme => ({
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