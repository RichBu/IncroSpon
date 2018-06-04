import React from "react";
import './footer.css';

const Footer = () => {
    return(
        <footer data-tip='coded by Rich Budek in React' className="footer_css navbar">
            <div className="row text-center">
                <span className="bungeeFont">© 2018 Rich Budek All rights Reserverd</span>
            </div>
        </footer>
    )
}

export default Footer;