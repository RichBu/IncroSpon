//
//
import React from "react";
import FileResume from './comp_file_resume';
import Iframe from 'react-iframe';
import './sub_info.css';


class SubInfo extends React.Component {
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
        this.pathProd = 'https://portfolio-richbu.herokuapp.com';
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
            console.log('turn resume on');
            this.setState( {resumeDivOn: true}, () => {
                console.log( this.state.resumeDivOn );
                this.setState( {resumeDivDisp: 'block'}, () => { 
                    this.setState( {resumeFileUrl: 'files/Resume-Rich_Budek_2017.pdf'} ,() => {
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
            <div className="subMenu_Info_ContainerStyle"  >
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

                <div className="textSub_Info_Menu">
                    <br />
                    <h3>Technical Design Information</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                            <br />
                            <br />
                            <br />
                            <i className="fa fa-question icon_big_Info" aria-hidden="true"></i>
                            {/* <img className='img-circle' src="images/Face_02.jpg" /> */}
                        </div>
                    
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            <br />
                            <h4 className='text_Info'>
                                Why this web site<br />
                            </h4>
                            <h5 className='text_Info'>
                                This web site is hand coded by me, Rich Budek, to demonstrate some of my skills as a full stack web developer.
                                My unique talents don't just lie with full stack web development and in the engineering field, but also the integration between
                                everything.
                            </h5>    
                            <h5 className='text_Info'>    
                                <strong>This website is NOT YET fully mobile responsive</strong>, so it looks best on a desktop or a high resolution tablet.
                            </h5>
                            <br />
                        </div>
                    </div>
                    <hr className='line_Info' />
                </div>

                <div className="subMenuHead">
                    <div className='row subMenu_Info_RowStyle'>                    
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            <br />
                            <div className='row'>
                                <h4 className='text_Info'>
                                Front end<br />
                                </h4>
                                <h5 className='text_Info'>
                                The front end of this web site is written using Facebook's React framework along with the obligatory
                                HTML5, CSS, and Javascript to go with it.  Several unique techniques had to be explored like the circular
                                pie image on the main page, getting coordinates on a page, etc.
                                </h5>
                            </div>
                            <div className='row'>
                                <h5>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>React</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>HTML</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>CSS</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Javascript</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Bootstrap</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>API calls</span>
                                    </p>
                                </div>    
                                </h5>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                            <br />
                            <br />
                            <br />
                            <i className="fa fa-chrome icon_big_Info" aria-hidden="true"></i>
                            {/* <img className='img-circle' src="images/Face_02.jpg" /> */}
                        </div>                        
                    </div>                    
                    <hr className='line_Info' />
                </div>


                <div className="subMenuHead">
                    <div className='row subMenu_Info_RowStyle'>                    
                        <div className='col-lg-4 col-md-4 col-sm-6 col-xs-10'>
                            <br />
                            <br />
                            <br />
                            <i className="fa fa-database icon_big_Info" aria-hidden="true"></i>
                            {/* <img className='img-circle' src="images/Face_02.jpg" /> */}
                        </div>                        
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-10'>
                            <br />
                            <div className='row'>
                                <h4 className='text_Info'>
                                Back end<br />
                                </h4>
                                <h5 className='text_Info'>
                                The backend runs under Node JS which serves the React front end pages but also
                                acts as an API, talking to a mySQL database.  On top of that, the backend sends
                                emails and text messages.
                                </h5>
                            </div>
                            <div className='row'>
                                <h5>
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Node JS</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Express</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>mySQL</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>API</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>API calls</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>body-parser</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>morgan</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>crypto</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>moment</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>numeral</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>mathjs</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>nodemailer</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>path</span>
                                    </p>
                                </div>    
                                <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>fs</span>
                                    </p>
                                </div>    
                                </h5>
                            </div>
                        </div>
                    </div>                    
                    <hr className='line_Info' />
                </div>


                <div className="subMenuHead">
                    <div className='row subMenu_Info_RowStyle'>                    
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-10'>
                            <br />
                            <div className='row'>
                                <h4 className='text_Info'>
                                Unique features demonstrated<br />
                                </h4>
                                <h5 className='text_Info'>
                                In addition to being a showcase for the obvious full stack web development and my graphics design skills, 
                                there are many features I demonstrate on this website.
                                </h5>
                            </div>
                            <div className='row'>
                                <h5>
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Unique graphics design</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Generating Pie graphic</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Get mouse coords</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Calculating pie slice</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Fading background images</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Displaying PDF</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>mySQL with images</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Multiple db indexes and tags</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Sending emails thru backend</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Send text message thru backend</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>Front end and back end integration</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>API calls to my functions</span>
                                    </p>
                                </div>    
                                <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 text-left'>
                                    <p><i className="fa fa-circle font_style_Info" aria-hidden="true"></i>
                                        <span className='text_Info'>API call to backend to 3rd party</span>
                                    </p>
                                </div>    
                                </h5>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-6 col-xs-10'>
                            <br />
                            <br />
                            <br />
                            <i className="fa fa-thumbs-up icon_big_Info" aria-hidden="true"></i>
                            {/* <img className='img-circle' src="images/Face_02.jpg" /> */}
                        </div>                        
                    </div>                    
                    <hr className='line_Info' />
                </div>

                <br />
                <br />
            </div>
        )
    }
}

export default SubInfo;