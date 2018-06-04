import React from "react";
import './main.css';
import { withRouter } from 'react-router';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xCoord: 0,
            yCoord: 0 
        };
      }

    componentDidMount() {
        console.log('component mounted');
        document.title = "IncroSpon";
        }

        
    render() {
    return (

        <div style={{ width: '100%', top: '0%', left: '0%', height:'100%' }}>
            <div style={{ height: '50px', top: '400px' }} >
            </div>
            <div id='div-main'  data-tip='click on a category' style={{ width: '400px', height: '400px', top: '400px' }} >
            </div>
            <div style={{ height: '350px' }} >
            </div>            
        </div>
         
    )}
}

export default withRouter(Main);