import React from "react";
import IncroSponContract from './../../contracts/IncroSpon.json'
import getWeb3 from './../../utils/getWeb3'
import './sub_participant.css';


var incroSponContract;
var incroSponContractInstance;


class SubParticipant extends React.Component {
    constructor(props) {
        super(props);
        // this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            xCoord: 0,
            yCoord: 0,
            form_sel_camp_id: '',
            form_sel_name: '',
            form_sel_started_by: '',

            form_addr_part: '',
            form_name_part: '',
            form_unit: 0,
            form_unit_goal: 0,
            form_date_start: 0,                    
            form_date_end: 0,                    
          
            form_name: '',
            form_started_by: '',
            form_end_date: '',
            form_unit_goal: 0,
            form_unit_so_far: 0,
            form_wei_paid_out: 0,
            form_wei_in_escrow: 0,
            web3: null,
            accounts: null,

            campaignList: [
                {
                    camp_id: 101,
                    name: 'test #1',
                    started_by: '0x330020432234',
                    end_date: '09/01/2018',
                    unit_goal: 1029,
                    unit_so_far: 0,
                    wei_paid_out: 0,
                    wei_in_escrow: 0,
                },
                {
                    camp_id: 102,
                    name: 'test #2',
                    started_by: '0x3300204322aa',
                    end_date: '09/20/2018',
                    unit_goal: 1040,
                    unit_so_far: 0,
                    wei_paid_out: 0,
                    wei_in_escrow: 0,
                }
            ], //campaignList

            partList: [
                {
                camp_id: 0, 
                addr_part: 0,
                name_part: "",
                unit: 0,
                unit_goal: 0,
                date_start: 0,
                date_end: 0
                }        
            ]
        };
        this.pathProd = 'https://portfolio-richbu.herokuapp.com';
        this.pathDev = 'http://localhost:3006';
        this.useProd = true;
        this.newCampaignButtonClick = this.newCampaignButtonClick.bind(this);
    }


    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const contract = require('truffle-contract')
        const incroSponContract = contract(IncroSponContract)
        incroSponContract.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on incroSponContract.
        this.state.web3.eth.getAccounts((error, _accounts) => {
            console.log('accounts =');
            console.log(_accounts);
            this.setState({accounts: _accounts});
            incroSponContract.deployed().then((instance) => {
                console.log('deployed');
                console.log(instance);
                incroSponContractInstance = instance


                return incroSponContractInstance.getCampaignsLen.call()
            }).then((result) => {
                let numCamp = parseInt(result.c[0]);
                console.log(`num of campaigns = ${numCamp}`);
                let promises = [];

                for (var i = 0; i < numCamp; i++) {
                    promises.push(incroSponContractInstance.getCampaign_rec(i));
                };
                return Promise.all(promises);
            }).then((data_rec) => {
                let campArray = [];
                console.log(`data_rec length = ${data_rec.length}`);
                for (var i = 0; i < data_rec.length; i++) {
                    let tempVal = parseInt(data_rec[i][3]);
                    console.log(tempVal);
                    campArray.push(
                        {
                            camp_id: i,
                            name: data_rec[i][0],
                            started_by: data_rec[i][1],
                            end_date: '',
                            unit_goal: parseInt(data_rec[i][3]),
                            unit_so_far: parseInt(data_rec[i][4]),
                            wei_paid_out: parseInt(data_rec[i][5]),
                            wei_in_escrow: parseInt(data_rec[i][6])
                        }
                    );
                    console.log(data_rec[i]);
                };
                this.setState({
                    campaignList: campArray
                }, () => console.log(this.state.campaignList));

                this.state.web3.eth.getAccounts((error, accounts) => {
                    console.log('accounts are in');
                    console.log(accounts[0]);
                    this.setState( {form_addr_part: accounts[0]} );
                });
            }); 
        });
    }


    componentDidMount() {
        console.log('at Campaign');
        document.title = "IncroSpon-Campaign";
        //load the proper projects
    }


    resetFormValues() {
        incroSponContractInstance.setPart_rec(
            this.state.form_sel_camp_id,
            this.state.form_addr_part,
            this.state.form_name_part,
            this.state.form_unit,
            this.state.form_unit_goal,
            this.state.form_date_start,
            this.state.form_date_end,
            {from: this.state.form_addr_part} );

        this.setState( {
            form_name: '',
            form_started_by: '',

            form_sel_camp_id: '',
            form_sel_name: '',
            form_sel_started_by: '',

            form_addr_part: '',
            form_name_part: '',
            form_unit: 0,
            form_unit_goal: 0,
            form_date_start: 0,                    
            form_date_end: 0,                    
        });
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.setState( {form_addr_part: accounts[0]} );
        });
    }
    

    loadPartToState(_camp_id) {
        //this function pulls out all of the participants for a campaign
        // this.state.web3.eth.getAccounts((error, _accounts) => {
        //     //used this to start the string of promises
        //     console.log(`error = ${error}`);
        //     console.log(`accounts = ${_accounts}`);
            // Promise.all([incroSponContractInstance.getParticipantsLen()])
            console.log('before getting record');
            Promise.all([ incroSponContractInstance.getParticipantInCampaign_rec.call(0,0)  ])
        .then((result2) => {
            console.log(`participants length=${result2}`);
            console.log(result2);
            return incroSponContractInstance.getNumParticipantForCampaign(this.state.form_sel_camp_id);
        }).then((result) => {
            console.log('num of participants for camp = ');
            console.log(result);
            let numPart = parseInt(result.c[0]);
            console.log(`num of part for this campaign = ${numPart}`);
            let promises = [];
            return incroSponContractInstance.getParticipantInCampaign_rec.call( 0,0 );
            // for (var i = 0; i < numPart; i++) {
            //     promises.push( incroSponContractInstance.getParticipantInCampaign_rec( this.state.form_sel_camp_id, i ) );
            // };
            // return Promise.all(promises);        
        }).then((data_rec) => {
            console.log(`data rec len = ${data_rec.length}`);
            let partArray = [];
            for (var i = 0; i < data_rec.length; i++) {
                let tempVal = parseInt(data_rec[i][3]);
                console.log(tempVal);
                partArray.push(
                    {
                        camp_id: this.state.form_sel_camp_id, 
                        addr_part: data_rec[i][0],
                        name_part: data_rec[i][1],
                        unit: data_rec[i][2],
                        unit_goal: data_rec[i][3],
                        date_start: data_rec[i][4],
                        date_end: data_rec[i][5]
                    }
                );
                console.log(data_rec[i]);
            };
            this.setState({
                partList: partArray
            }, () => console.log(this.state.partList));            
        })

    }    

    addr_partChange(event) {
        this.setState({form_addr_part: event.target.value});
    }


    name_partChange(event) {
        this.setState({form_name_part: event.target.value});
    }


    unitChange(event) {
        this.setState({form_unit: event.target.value});
    }


    unit_goalChange(event) {
        this.setState({form_unit_goal: event.target.value});
    }


    date_startChange(event) {
        this.setState({form_date_start: event.target.value});
    }


    date_endChange(event) {
        this.setState({form_date_end: event.target.value});
    }


    newCampaignButtonClick = (event) => {
        event.preventDefault();
        console.log('button pressed = new campaign');
        this.resetFormValues();
    }


    listPartButtonClick = (event) => {
        event.preventDefault();
        console.log('button pressed = list part for campaign');
        this.loadPartToState( this.state.form_sel_camp_id );
    }


    selectCampaignButtonClick = (_camp_id, _name, _started_by ) => {
        console.log( `camp id = ${_camp_id}` );
        this.setState( {
            form_sel_camp_id: _camp_id,
            form_sel_name: _name,
            form_sel_started_by: _started_by,    
        })
    }


    render() {
        return (
            <div className="subMenu_Campaign_ContainerStyle"  >
                <div className='subMenuSpacer'>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div className="textSub_Campaign_Menu">
                    <br />
                    <h3>Participants in a Campaign</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <br />
                            <h4 className='text_Campaign'>
                                All the active campaigns and participants currently in the blockchain.
                    </h4>
                        </div>
                    </div>
                </div>


                <div className="subMenuHead">
                    <hr className='line_Campaign' />
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4 className='text_Campaign'><strong>Campaigns:</strong></h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-2 col-md-3 col-sm-4 col-xs-12'>
                            <h4 className='text_Campaign'>Campaigns and Participants</h4>
                        </div>
                    </div>
                    <hr className='line_Campaign' />
                </div>

                <div className='subMenu_proj_div'>
                    <br />
                    <div className='row' style={{ padding: '0px 5px 0px 20px' }}>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            {this.state.campaignList.map((b) =>
                                <div className='row' >
                                    <div key={b.camp_id} style={{ textAlign: 'left' }} className='row-hover' onClick={() => this.selectCampaignButtonClick( b.camp_id, b.name, b.started_by ) } >
                                        <br />
                                        <br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>id:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.camp_id}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>name:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.name}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>started by:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.started_by}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>end date:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.end_date}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>unit goal:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.unit_goal}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>unit so far:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.unit_so_far}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>wei paid out:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_paid_out}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>wei in escrow:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_in_escrow}</h4><br />
                                        <br />
                                    </div>
                                    <br />
                                    <hr className='line_Campaign' />
                                </div>
                            )}
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                            <br />
                            <br />
                            <h4 className='text_Campaign'>Campaign selected</h4>
                            //first put in the selected campaign
                            <small id="emailHelp" className="form-text text-muted text-input-desc">selected campaign id:</small>
                            <input type="text" className="form-control" id="part-started_by" aria-describedby="emailHelp" value={this.state.form_sel_camp_id}  placeholder="selected id"></input>
                            <br />

                            <small id="emailHelp" className="form-text text-muted text-input-desc">campaign name:</small>
                            <input type="text" className="form-control" id="part-name" aria-describedby="emailHelp" value={this.state.form_sel_name}  placeholder="selected campaign name"></input>
                            <br />

                            <small id="emailHelp" className="form-text text-muted text-input-desc">started by (address)</small>
                            <input type="text" className="form-control" id="part-started_by" aria-describedby="emailHelp" value={this.state.form_sel_started_by}  placeholder="selected started by addr"></input>
                            <br />

                            <hr className='line_Campaign' />
                            <button style={{ display: 'inline' }} className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.newCampaignButtonClick} >
                                {/* <i className="fa fa-envelope font_button_contact" aria-hidden="true"></i> */}
                                Join as Participant
                            </button>
                            <button style={{ display: 'inline' }} className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.listPartButtonClick} >
                                {/* <i className="fa fa-envelope font_button_contact" aria-hidden="true"></i> */}
                                List Participants
                            </button>
                            <hr className='line_Campaign' />

                            <form onSubmit={this.sendEmailButtonClick}>
                                <div className='centerDiv_ContactForm'>
                                    <small id="emailHelp" className="form-text text-muted text-input-desc">your ethr address</small>
                                    <input type="text" className="form-control" id="part-addr_part" aria-describedby="emailHelp" value={this.state.form_addr_part} onChange={this.addr_partChange.bind(this)} placeholder="your ether addr"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">your name </small>
                                    <input type="text" className="form-control" id="part-name_part" aria-describedby="emailHelp" value={this.state.form_name_part} onChange={this.name_partChange.bind(this)} placeholder="your name"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">units</small>
                                    <input type="text" className="form-control" id="part-unit" aria-describedby="emailHelp" value={this.state.form_unit} onChange={this.unitChange.bind(this)} placeholder="unit goal"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">units goal (max)</small>
                                    <input type="text" className="form-control" id="part-unit_goal" aria-describedby="emailHelp" value={this.state.form_unit_goal} onChange={this.unit_goalChange.bind(this)} placeholder="unit goal (max)"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">start date</small>
                                    <input type="text" className="form-control" id="part-date_start" aria-describedby="emailHelp" value={this.state.form_date_start} onChange={this.date_startChange.bind(this)} placeholder="start date"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">end date (finish by)</small>
                                    <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.form_date_end} onChange={this.date_endChange.bind(this)} placeholder="end date"></input>
                                    <br /><br />

                                    <br /><br />
                                    {/* <h4 className='text_Contact'>Reason</h4> */}
                                </div>
                                <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorReason}</small>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                    </div>
                    <div>
                        <br />
                        <br />
                    </div>

                </div>
            </div>

        )
    }
}

export default SubParticipant;
