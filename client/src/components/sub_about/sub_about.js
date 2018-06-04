//
//
import React from "react";
import FileResume from './comp_file_resume';
import Iframe from 'react-iframe';
import './sub_about.css';


class SubAbout extends React.Component {
    constructor(props) {
        super(props);
        this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            xCoord: 0,
            yCoord: 0,
            resumePDF: '/file',
            resumeDivOn: false,
            resumeDivDisp: 'none',
            resumeFileUrl: ''
        };
        //https://github.com/RichBu/Portfolio/tree/master/client/public/files/Resume-Rich_Budek_2017.pdf
        this.pathProd = 'https://portfolio-richbu.herokuapp.com/client/public';
        this.pathDev = 'http://localhost:3006';
        this.useProd = true;
    }


    componentDidMount() {
        console.log('at About');
        document.title = "Rich Budek - About Me";
        // this.ifr.onload = () => {
        //     this.forceUpdate();
        // };
    }


    categoryCick(event) {
        //clicked on a category

    }


    sendButtonClick = () => {
        console.log('button is hit');
        let fetchStr = '/send_email';
        if (this.useProd) {
            fetchStr = this.pathProd + fetchStr;
        } else {
            fetchStr = this.pathDev + fetchStr;
        };
        console.log(fetchStr);
        return fetch( fetchStr, {
            method: 'post',
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: {}
            body: JSON.stringify({ name: 'test' })
        }).then(res => res.json())
    }


    resumeButtonClick = () => {
        console.log('resume button click');
        if ( this.state.resumeDivOn === true ) {
            //resume is on, turn off
            console.log('turn resume off');
            this.setState( {resumeDivOn: false}, () => {
                console.log( this.state.resumeDivOn );
                this.setState( {resumeDivDisp: 'none'}, () => { 
                    this.setState( {resumeFileUrl: ''} ,() => {
                        this.forceUpdate();
                    });
                });
            });
        } else {
            //resume is off, turn on
            let resPDF = 'https://drive.google.com/file/d/1MOQQmZI1e70-ruzlfOrh9WTQPSN7g27U/preview';
            if (this.useProd === true ) {
                // resPDF = this.pathProd + '/' + resPDF;
            };
            console.log(resPDF);
                
            console.log('turn resume on');
            this.setState( {resumeDivOn: true}, () => {
                console.log( this.state.resumeDivOn );
                this.setState( {resumeDivDisp: 'block'}, () => { 
                    this.setState( {resumeFileUrl: resPDF } ,() => {
                        this.forceUpdate();
                    });
                });
            });
        };
    }


    render() {
        let httpPath;
        if (this.useProd) {
            httpPath = this.pathProd;
        } else {
            httpPath = this.pathDev;
        };

        //let resumePDF = httpPath + '/file';
    
        return (
            <div className="subMenu_About_ContainerStyle"  >
                <div className='subMenuSpacer'>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

                {/* <div style={{ width: '100%', height: '900px', overflow: 'auto' }}>
                    <iframe
                        title="file"
                        style={{ width: '100%', height: '100%' }}
                        src={'files/Resume-Rich_Budek_2017.pdf'}
                    />
                </div> */}

                <div className="textSub_About_Menu">
                    <br />
                    <h3>About Me</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-4 col-md-4 col-sm-6 col-xs-10'>
                            <br />
                            <img className='img-circle' src="images/Face_02.jpg" />
                        </div>
                    
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-10'>
                            <br />
                            <div className='row'>
                                <h4 className='text_About'>
                                    Thanks for visitng<br />
                                </h4>
                                <h5 className='text_About'>
                                    I am Rich Budek, a full stack web developer, degreed engineer, and an integration specialist. 
                                    Welcome to my site.  In addition to my technical skills on this web-site, I am also an experienced
                                    senior management professional (10+ years) at the V.P. Engineering level. I have designed and hand coded
                                    this web site as a full stack app to showcase my talents.  Please feel free to browse thru the site 
                                    and contact me thru the contact page.
                                </h5>
                            </div>    
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6' style={{textAlign: 'left'}}>
                                    <h5 style={{display: 'inline', padding: '0px 5px 0px 12px'}} className='text_About'>
                                        <br />
                                        You can click on this link to the right to learn more about me:
                                    </h5>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <br />
                                    <a data-tip='Welcome message' href='https://youtu.be/m_vKpNkvX24'>
                                    <i className="fa fa-youtube font_style_about" aria-hidden="true"></i>
                                    </a>
                                </div>    
                            </div>
                            <br />
                        </div>
                    </div>
                    <hr className='line_About' />
                </div>

                <div className="subMenuHead">
                <div className={this.state.resumeDivOn ? 'hiddenResume' : 'visibleResume'}>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <h4 className='text_About'>Career Highlights</h4>
                            <h5 className='text_About'>
                                <ul>
                                    <li>
                                        Over 10 years experience as VP Engineering at various organizations
                                    </li>
                                    <li>
                                        Full stack web developer experience
                                    </li>
                                    <li>
                                        Degreed electrical engineer with vast range of expertise from PCB, embedded controllers, to networked PLC's
                                    </li>
                                    <li>
                                        Mechanical engineering experience along with CAD and CNC experience
                                    </li>
                                    <li>
                                        Statistics and six sigma Design of Experiment background
                                    </li>
                                    <li>
                                        Full integration and automation specialist
                                    </li>
                                </ul>    
                            </h5>
                        </div>
                    </div>
                    </div>
                </div>


                <div className="subMenuHead div-notResume">
                <div className={this.state.resumeDivOn ? 'hiddenResume' : 'visibleResume'}>
                    <hr className='line_About' />
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <h4 className='text_About'>Patents, Publications, Awards</h4>
                            <h5 className='text_About'>
                            I have earned several patents and published articles on-line. 
                            <br/><br />
                            <br /><br />
                            </h5>
                        </div>
                    </div>
                </div>    
                </div>


                <div className="subMenuHead div-notResume">
                    <hr className='line_About' />
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <h4 className='text_About'>You can see me on-line</h4>
                            <br />
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6'>
                            <a data-tip='linked in' href='https://www.linkedin.com/in/rich-budek-72832410/'>
                            <i className="fa fa-linkedin font_style_about" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6'>
                            <a data-tip='github sample code' href='https://github.com/RichBu'>
                            <i className="fa fa-github font_style_about" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6'>
                            <a data-tip='I got recorded at a tradeshow' href='https://www.youtube.com/watch?v=YSuZ6VJ-4YE'>
                            <i className="fa fa-youtube font_style_about" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6'>
                            <a data-tip='Resume in PDF format' onClick = {this.resumeButtonClick} >
                            <i className="fa fa-file font_style_about" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* <div className={this.state.resumeDivOn ? 'subMenuHead visibleResume' : 'subMenuHead hiddenResume' }> */}
                <div className={this.state.resumeDivOn ? 'subMenuHead visibleResume' : 'subMenuHead hiddenResume' }>
                {/* <div className='subMenuHead visibleResume'> */}
                    <hr className='line_About' />
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <h4 className='text_About'>On-line Resume</h4>
                            <br />
                    <div style={{ width: '100%', height: '900px', overflow: 'auto' }} 
                        // className={this.state.resumeDivOn ? 'visibleResume' : 'hiddenResume' }  
                    >
                        {/* <Iframe
                            title="file"
                            style={{ width: '100%', height: '100%' }}
                            src={'files/Resume-Rich_Budek_2017.pdf'}
                            ref={(f) => this.ifr = f }
                        /> */}
                        <Iframe
                            width= '100%'
                            height= '100%'
                            url={this.state.resumeFileUrl}
                            display = {this.state.resumeDivDisp}
                            // ref={(f) => this.ifr = f }
                        />
                    </div>
                        </div>                        
                    </div>
                </div>

                <div className="subMenuHead div-notResume">
                <div className={this.state.resumeDivOn ? 'hiddenResume' : 'visibleResume'}>
                    <hr className='line_About' />
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <h4 className='text_About'>Location</h4>
                            <h5 className='text_About'>
                            I am located in the near western suburbs of Chicago. 
                            <br/><br />
                            Willing to travel within the Chicago area up to 1.5 hours each way on a regular basis, if located near public
                            transportation, then distance can be further.

                            <br /><br />
                            I am located near O'Hare and close to Midway as well, so can travel out of town and
                            willing to do it.
                            </h5>
                        </div>
                    </div>
                    <hr className='line_About' />
                </div>    
                </div>

                <br />
                <br />
            </div>
        )
    }
}

export default SubAbout;