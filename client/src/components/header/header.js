import React from "react";
import './header.css';
import { Link } from "react-router-dom";
import BtnDropDown from './../bttn_drop_down/';




const Header = () => {
    var sendButtonClick = () => {
        // debugger
        console.log('button is hit');
        // return fetch("/send_email", {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({name : 'test'})
        //   }).then(res => res.json())
    };          
    
    return(
            <header className='containerHead navbar navbar-fixed-top'>
                <div className="row text-center" style={{ padding: '5px 0px 0px 0px', margin: '-20px 0px 5px 0px' }} >
                    <div >
                        <div style={{float: 'left'}}>
                            <BtnDropDown />
                        </div>
                        <h2 className='bungeeFont'>Rich Budek</h2>
                        <h3 className='italicHeader'>full stack web developer, degreed engineer, and integration specialist.</h3>
                    </div>
                </div>
                {/* <button className="btn btn-default btn-lg bttnHeader" onClick={sendButtonClick}>Test Email</button>                 */}
            </header> 
    )
}


export default Header;