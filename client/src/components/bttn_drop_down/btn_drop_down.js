import React from "react";
import SplitButton from "react";
import MenuItem from "react-dom";
import './btn_drop_down.css';
import { Link } from "react-router-dom";


let btn_title = 'MENU';

const btn_drop_down = () => {
    return (
        <div className="dropdown">
            <button className="btn btn-default btn-lg dropdown-toggle bttnHeader" type="button" id="dropdownMenu1"
                data-toggle="dropdown"><span className="glyphicon glyphicon-menu-hamburger"></span>
            </button>
            <ul className="dropdown-menu">
                <li><Link to='/'>
                <i className="fa fa-home font_style_button" aria-hidden="true"></i>
                <span>  </span>Home</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to='/about'>
                <i className="fa fa-user font_style_button" aria-hidden="true"></i>
                <span>  </span>About Me</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to='/sub-MechEng'>Campaigns</Link></li>
                <li><Link to='/Sub-ElectEng'>Participant</Link></li>
                <li><Link to='/Sub-EngCalc'>Sponsor</Link></li>
                <li><Link to='/Sub-MobApps'>Dispersement</Link></li>
                <li role="separator" className="divider"></li>
                <li><a href="/info">
                <i className="fa fa-info font_style_button" aria-hidden="true"></i>
                <span>  </span>Tech Design Info</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="/contact">
                <i className="fa fa-envelope font_style_button" aria-hidden="true"></i>
                <span>  </span>Contact Me</a></li>
            </ul>
        </div>
    )
}

export default btn_drop_down;
