import React from "react";
import './main.css';
import { withRouter } from 'react-router';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            xCoord: 0,
            yCoord: 0 
        };
      }

    componentDidMount() {
        console.log('component mounted');
            document.title = "Rich Budek Portfolio";
        }
        categoryCick(event) {
            //clicked on a category
            let el = document.getElementById('div-main-circle');
            let rect = document.getElementById('div-main-circle').getBoundingClientRect();
            // var offset_X = document.getElementById('div-main-circle').offsetLeft;
            // var offset_Y = document.getElementById('div-main-circle').offsetTop;
            let lx, ly;
            for (lx = 0, ly = 0;
                el != null;
                lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
            // console.log(`pos = ${lx} , ${ly}`);

            let div_Y_len = rect.bottom - rect.top;
            let div_X_len = rect.right - rect.left;
            let cent_rad = div_X_len / 2.0 / 2.0;  //assume it's square
            cent_rad = 150.00;
            let out_rad = 300.00;  //outside diameter 
            let cent_Y = div_Y_len / 2.0;
            let cent_X = div_X_len / 2.0;
            let clientX = event.clientX;
            let clientY = event.clientY;
            let dist_X = clientX - rect.left - 150.0 - cent_X -100.0;
            let dist_Y = cent_Y - (clientY - rect.top) + 150.0;
            let tempRad = dist_X * dist_X + dist_Y * dist_Y;
            let dist_rad = Math.pow(tempRad, 0.5);
            console.log(`real position = ${dist_X} , ${dist_Y}`);
            console.log('dist rad = ' + dist_rad);

            let segment = 0;
            let ang;
            if (dist_rad <= cent_rad) {
                segment = 10;
            } else {
                if (dist_rad > out_rad) {
                    //if the radius is larger than the outside diameter then do nothing
                } else {
                    if (dist_X === 0.0) {
                        //it is either segment 1 or 5
                        if (dist_Y > 0) {
                            ang = 90.00;
                        } else {
                            ang = -90.00;
                        };
                    } else {
                        ang = Math.atan2(dist_Y, dist_X) * 180.0 / Math.PI;
                    };
                    if (ang < 112.50 && ang > 67.50) {
                        segment = 1;
                    } else if (ang > 22.50 && ang < 67.50) {
                        segment = 2;
                    } else if (ang > -22.50 && ang < 22.50) {
                        segment = 3;
                    } else if (ang > -67.50 && ang < -22.50) {
                        segment = 4;
                    } else if (ang > -112.50 && ang < -67.50) {
                        segment = 5;
                    } else if (ang > -157.50 && ang < -112.50) {
                        segment = 6;
                    } else if (ang > 157.50 || ang < -157.50) {
                        segment = 7;
                    } else if (ang < +157.50 && ang > 112.50) {
                        segment = 8;
                    };
                };
            };

            if( segment === 1) {
                this.props.history.push('/sub-MechEng');
            };
            if( segment === 2) {
                this.props.history.push('/Sub-ElectEng');
            };
            if( segment === 3) {
                this.props.history.push('/Sub-EngCalc');
            };
            if( segment === 4) {
                this.props.history.push('/Sub-MobApps');
            };
            if( segment === 5) {
                this.props.history.push('/Sub-SysArch');
            };
            if( segment === 6) {
                this.props.history.push('/Sub-Unity');
            };
            if( segment === 7) {
                this.props.history.push('/Sub-PC');
            };
            if( segment === 8) {
                this.props.history.push('/Sub-CNC');
            };
            if( segment === 10) {
                console.log('hit segment 10');
                this.props.history.push('/Sub-FullStack');
            };
            
            // console.log(`angle = ${ang}`);
            console.log(`segment = ${segment}`);


        }
    render() {
    return (
        <div style={{ width: '100%', top: '0%', left: '0%', height:'100%' }}>
            <div className="crossfade">
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
                <figure></figure>
            </div>

            <div style={{ height: '50px', top: '400px' }} >
            </div>
            <div id='div-main-circle' onClick = {this.categoryClick} data-tip='click on a category' style={{ width: '400px', height: '400px', top: '400px' }} >
                <div id="spacer" style={{ width: '1px', height:'40px' }}>
                </div>
                <div className="pie" data-start="-22" data-value="45"></div>
                <div className="pie" data-start="23" data-value="45"></div>
                <div className="pie" data-start="68" data-value="45"></div>
                <div className="pie" data-start="113" data-value="45"></div>
                <div className="pie" data-start="158" data-value="45"></div>
                <div className="pie" data-start="203" data-value="45"></div>
                <div className="pie" data-start="248" data-value="45"></div>
                <div className="pie" data-start="293" data-value="45"></div>

                <div className="circle" data-start="0" data-value="180"></div>
                <div className="circle" data-start="180" data-value="180"></div>

                <div className="text1">
                    <h3>Mechanical
                    <br />Engineering
                    </h3>
                </div>
                <div className="text2">
                    <h3>Electrical
                        <br />Engineering
                        </h3>
                </div>
                <div className="text3">
                    <h3>Engineering
                        <br />Calculations
                        <br /> and
                        <br />Simulations
                        </h3>
                </div>
                <div className="text4">
                    <h3>Mobile
                        <br />Apps
                        </h3>
                </div>
                <div className="text5">
                    <h3>System
                        <br />Architecture
                        </h3>
                </div>
                <div className="text6">
                    <h3>Unity 3D</h3>
                </div>
                <div className="text7">
                    <h3>IOT /
                    <br />Blockchain
                    </h3>
                </div>
                <div className="text8">
                    <h3>CNC
                        <br />Robotics
                        </h3>
                </div>
                <div className="text20">
                    <h3>Full Stack
                        <br />Web Development
                        <br />And Integration
                        </h3>
                </div>
                {/* <div className="blankImage">
                    <figure></figure>
                </div> */}

            </div>
            <div style={{ height: '350px' }} >
            </div>
            
        </div>
    )}
}

export default withRouter(Main);