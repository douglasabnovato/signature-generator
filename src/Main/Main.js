import React from 'react'; 
import Card from '@material-ui/core/Card'; 
import Form from '../SignatureInfo/SignatureInfo';
import SignatureView from '../SignatureView/SignatureView';
import ButtonAppBar from '../ButtonAppBar/ButtonAppBar'; 

export default class Main extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    } 

    render() {
        return ( 
            <div>
                <ButtonAppBar />                
                <Card className={useStyles.card}>                    
                    <Form context={this} />
                    {}
                    <SignatureView context={this} />                            
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
        margin: '5px 5px 5px 5px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})); 