//
//
import React from "react";
import './sub_contact.css';


class SubContact extends React.Component {
    constructor(props) {
        super(props);
        this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            xCoord: 0,
            yCoord: 0,
            enbBttnEmail: false,
            enbBttnText: false,
            formName: '',
            formEmail: '',
            formPhone: '',
            formMsg: '',
            formReason: '',
            formErrorName: 'ERROR - name',
            formHintEmail: 'if want an email response',
            formErrorEmail: 'ERROR - email',
            formHintPhone: 'optional if there is an email',
            formErrorPhone: 'ERROR - phone',
            formErrorMessage: 'ERROR - message',
            formErrorReason: 'ERROR - reason'
        };
        //don't know if need this binding
        this.sendEmailButtonClick = this.sendEmailButtonClick.bind(this);
        this.pathProd = 'https://portfolio-richbu.herokuapp.com';
        this.pathDev = 'http://localhost:3006';
        this.useProd = true;

    }


    componentDidMount() {
        console.log('at contact form');
        document.title = "Rich Budek - Contact";
        this.setState({formErrorName: ''});
        this.setState({formErrorEmail: ''});
        this.setState({formErrorPhone: ''});
        this.setState({formErrorMessage: ''});
        this.setState({formErrorReason: ''});
    }
    categoryCick(event) {
        //clicked on a category

    }


    checkValidName() {
        if( this.state.formName === undefined || this.state.formName === null || this.state.formName.trim() === ""  ) {
            //the name is blank
            this.setState({formErrorName: 'NAME IS BLANK'});
            return false;
        };
            //email is not blank so check if valid
        if( this.state.formName.indexOf('@') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        if( this.state.formName.indexOf('.') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        if( this.state.formName.indexOf('!') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        if( this.state.formName.indexOf('$') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        if( this.state.formName.indexOf('<') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('>') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorName: 'NAME IS INVALID'});
            return false;
        };
        
        this.setState({formErrorName: ''});
        return true;
    }


    checkValidReason() {
        console.log(`reason=${this.state.formReason}`);
        if( this.state.formReason === undefined || this.state.formReason === null || this.state.formReason.trim() === ""  ) {
            //the name is blank
            this.setState({formErrorReason: 'NEED TO PICK A REASON'});
            return false;
        };
        this.setState({formErrorReason: ''});
        return true;
    };


    checkValidEmail() {
        let outVal;
        if( this.state.formEmail === undefined || this.state.formEmail === null || this.state.formEmail.trim() === ""  ) {
            //the name is blank
            this.setState({formErrorEmail: 'EMAIL IS BLANK'});
            return false;
        };
            //email is not blank so check if valid
        if( this.state.formEmail.indexOf('@') <= 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('.') <= 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('!') > 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('$') > 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('<') > 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        if( this.state.formEmail.indexOf('>') > 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorEmail: 'EMAIL IS INVALID'});
            return false;
        };
        
        this.setState({formErrorEmail: ''});
        return true;
    }
 

    checkValidMessage() {
        console.log(this.state.formMsg);
        console.log(this.state.formMsg.value);
        if( this.state.formMsg === undefined || this.state.formMsg === null || this.state.formMsg.trim() === ""  ) {
            //the name is blank
            this.setState({formErrorMessage: 'MESSAGE IS BLANK'});
            return false;
        };
            //Msg is not blank so check if valid
        if( this.state.formMsg.indexOf('@') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorMessage: 'MESSAGE INVALID'});
            return false;
        };
        if( this.state.formMsg.indexOf('!') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorMessage: 'MESSAGE IS INVALID'});
            return false;
        };
        if( this.state.formMsg.indexOf('$') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorMessage: 'MESSAGE IS INVALID'});
            return false;
        };
        if( this.state.formMsg.indexOf('<') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorMessage: 'MESSAGE IS INVALID'});
            return false;
        };
        if( this.state.formMsg.indexOf('>') === 0  ) {
            //doesn't have an '@ in it
            this.setState({formErrorMessage: 'MESSAGE IS INVALID'});
            return false;
        };
        
        this.setState({formErrorMessage: ''});
        return true;
    }
    



    checkForm()  {
        if( this.state.formName === undefined || this.state.formName === null || this.state.formName.trim() === ""  ) {
            //the name is blank
            console.log('name is blank');
            this.setState({formErrorName: 'YOU NEED A NAME'});
        };
    }


    nameChange(event) {
        this.setState({formName: event.target.value});
        if ( this.state.formName === undefined || this.state.formName === null || this.state.formName.trim() === ""  ) {
        } else {
            //the name is not blank
            this.setState({formErrorName: ''});
        }
      }


    emailChange(event) {
        this.setState({formEmail: event.target.value});
        this.checkForm();
      }


    phoneChange(event) {
        this.setState({formPhone: event.target.value});
      }


    msgChange(event) {
        this.setState({formMsg: event.target.value});
      }


    sendEmailButtonClick = (event) => {
        event.preventDefault();
        console.log('button is hit');
        this.checkValidEmail();     //call the function to get it to output
        this.checkValidMessage(); //call it to set the error string
        this.checkValidName(); //call it to set the error string
        this.checkValidReason(); //call it to set the error string
        if ( this.checkValidEmail() === true && this.checkValidMessage() === true && this.checkValidName() === true && this.checkValidReason() === true )
        {
            let fetchStr = '/send_email';
            if (this.useProd) {
                fetchStr = this.pathProd + fetchStr;
            } else {
                fetchStr = this.pathDev + fetchStr;
            };

            let sendObj = {
                name: this.state.formName,
                email: this.state.formEmail,
                phone: this.state.formPhone,
                message: this.state.formMsg,
                purpose: this.state.formReason
            }
            return fetch( fetchStr, {
                method: 'POST',
                // mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( sendObj ),
                // body: JSON.stringify( {name: 'test'} )
                // body: { sendObj }
            }).then(res => res.json())
        }
    }


    sendTextButtonClick = (event) => {
        event.preventDefault();
        console.log('send text button is hit');
        this.checkValidMessage(); //call it to set the error string
        this.checkValidName(); //call it to set the error string
        this.checkValidReason(); //call it to set the error string

        if ( this.checkValidMessage() === true && this.checkValidName() === true && this.checkValidReason() === true )
        {
            let fetchStr = '/send_text';
            if (this.useProd) {
                fetchStr = this.pathProd + fetchStr;
            } else {
                fetchStr = this.pathDev + fetchStr;
            };

            let sendObj = {
                name: this.state.formName,
                email: this.state.formEmail,
                phone: this.state.formPhone,
                message: this.state.formMsg,
                purpose: this.state.formReason
            }

            if (sendObj.name === undefined || sendObj.name ===null ) {
                sendObj.name = " ";
            };
            if (sendObj.email === undefined || sendObj.email ===null ) {
                sendObj.email = " ";
            };
            if (sendObj.phone === undefined || sendObj.phone ===null ) {
                sendObj.phone = " ";
            };
            if (sendObj.message === undefined || sendObj.message ===null ) {
                sendObj.message = " ";
            };
        
            return fetch( fetchStr, {
                method: 'POST',
                // mode: "no-cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( sendObj ),
                // body: JSON.stringify( {name: 'test'} )
                // body: { sendObj }
          }).then(res => res.json())
        };
    }


    handleReasonClick = (event) => {
        console.log(`reason=${this.state.formReason}`)
        this.setState({ formReason: event.target.value });
    }


    render() {
        return (
            <div className="subMenu_Contact_ContainerStyle"  >
                <div className='subMenuSpacer'>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div className="textSub_Contact_Menu">
                    <br />
                    <h3>Contacting Me</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <br />
                            <h4 className='text_Contact'>
                                I can be contacted via this form, which can send me an email or a text.  All information
                                is sent to my backend thru an API call and then forwarded to me.
                                <br />
                                <br />
                            </h4>
                        </div>
                    </div>
                </div>


                <div className="subMenuHead">
                    <hr className='line_Contact' />
                    <h4 className='text_Contact'><strong>Please fill out and supply either email or phone or both:</strong></h4>
                    <br />
                    <div className='row'>
                    <form onSubmit={this.sendEmailButtonClick}> 
                        <div className='centerDiv_ContactForm'>
                        <input type="text" className="form-control" id="cont-name" aria-describedby="emailHelp" value={this.state.formName} onChange={this.nameChange.bind(this)} placeholder="name"></input>
                        <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorName}</small>
                        <br /><br />
                        <input type="email" className="form-control" id="cont-email" aria-describedby="emailHelp" value={this.state.formEmail} onChange={this.emailChange.bind(this)} placeholder="email    (if want an email response)"></input>
                        <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorEmail}</small>
                        {/* <small id="emailHelp" className="form-text text-muted">if want an email response</small> */}
                        <br /><br />
                        <input type="email" className="form-control" id="cont-phone" aria-describedby="emailHelp" value={this.state.formPhone} onChange={this.phoneChange.bind(this)} placeholder="phone    (optional if there is an email)"></input>
                        <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorPhone}</small>
                        <br /><br />
                        <textarea className="form-control" id="cont-message" rows="5" onChange={this.msgChange.bind(this)} value={this.state.formMsg} placeholder="enter your message. text will be chopped to first 100 characters"></textarea>
                        <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorMessage}</small>
                        <br /><br />
                        <h4 className='text_Contact'>Reason</h4> 
                        <div className="form-check radio-inline radio-contact">
                            <input className="form-check-input" name="group101" type="radio" onChange={this.handleReasonClick} value="Information" checked={this.state.formReason ==='Information'}></input>
                            <label className="form-check-label text_Contact radio-contact-inp" >Information</label>
                        </div>

                        <div className="form-check radio-inline radio-contact">
                            <input className="form-check-input" name="group101" type="radio" onChange={this.handleReasonClick}  value="Opportunity" checked={this.state.formReason ==='Opportunity'}></input>
                            <label className="form-check-label text_Contact radio-contact-inp" >Opportunity</label>
                        </div>

                        <div className="form-check radio-inline radio-contact">
                            <input className="form-check-input" name="group101" type="radio" onChange={this.handleReasonClick}  value="Comment" checked={this.state.formReason ==='Comment'}></input>
                            <label className="form-check-label text_Contact radio-contact-inp" >Comment</label>
                        </div>

                        <div className="form-check radio-inline radio-contact">
                            <input className="form-check-input" name="group101" type="radio" onChange={this.handleReasonClick}  value="Reconnecting" checked={this.state.formReason ==='Reconnecting'}></input>
                            <label className="form-check-label text_Contact radio-contact-inp" >Reconnecting</label>
                        </div>
                        </div>
                        <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorReason}</small>
                    </form>    
                    </div>
                    <br />
                    <br />
                    <button className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.sendEmailButtonClick} >
                        <i className="fa fa-envelope font_button_contact" aria-hidden="true"></i>
                        Send Email
                    </button>
                    <button className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.sendTextButtonClick} >
                        <i className="fa fa-mobile font_button_contact2" aria-hidden="true"></i>
                        Send Text</button>
                    <hr className='line_Contact' />
                </div>

                <div className='subMenu_proj_div'>
                    <br />
                    <br />
                </div>
            </div>


        )
    }
}

export default SubContact;