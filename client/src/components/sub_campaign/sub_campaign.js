import React from "react";
import IncroSponContract from './../../contracts/IncroSpon.json'
import getWeb3 from './../../utils/getWeb3'
import './sub_campaign.css';


var incroSponContract;
var incroSponContractInstance;


class SubCampaign extends React.Component {
    constructor(props) {
        super(props);
        // this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            xCoord: 0,
            yCoord: 0,
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
            ] //projList
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
                }, () => console.log(this.state.projList));

                this.state.web3.eth.getAccounts((error, accounts) => {
                    console.log('accounts are in');
                    console.log(accounts[0]);
                    this.setState( {form_started_by: accounts[0]} );
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
        incroSponContractInstance.setCampaign_rec(
            this.state.form_name,  
            this.state.form_started_by,
            this.state.form_end_date, 
            {from: this.state.form_started_by} );

        this.setState( {
            form_name: '',
            //form_started_by: '',
            form_end_date: '',
            form_unit_goal: 0,
            form_unit_so_far: 0,
            form_wei_paid_out: 0,
            form_wei_in_escrow: 0,                    
        });
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.setState( {form_started_by: accounts[0]} );
        });
    }
    

    nameChange(event) {
        this.setState({form_name: event.target.value});
    }


    started_byChange(event) {
        this.setState({form_started_by: event.target.value});
    }


    end_dateChange(event) {
        this.setState({form_end_date: event.target.value});
    }


    unit_goalChange(event) {
        this.setState({form_unit_goal: event.target.value});
    }


    unit_so_farChange(event) {
        this.setState({form_unit_so_far: event.target.value});
    }


    wei_paid_outChange(event) {
        this.setState({form_wei_paid_out: event.target.value});
    }


    wei_in_escrowChange(event) {
        this.setState({form_wei_in_escrow: event.target.value});
    }


    newCampaignButtonClick = (event) => {
        event.preventDefault();
        console.log('button pressed = new campaign');
        this.resetFormValues();
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
                    <h3>Campaigns</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <br />
                            <h4 className='text_Campaign'>
                                All the active campaigns currently in the blockchain.
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
                            <h4 className='text_Campaign'>Campaigns</h4>
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
                                    <div key={b.camp_id} style={{ textAlign: 'left' }} className='row-hover' >
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
                            <form onSubmit={this.sendEmailButtonClick}>
                                <div className='centerDiv_ContactForm'>
                                    <small id="emailHelp" className="form-text text-muted text-input-desc">campaign name:</small>
                                    <input type="text" className="form-control" id="camp-name" aria-describedby="emailHelp" value={this.state.form_name} onChange={this.nameChange.bind(this)} placeholder="campaign name"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">started by (address)</small>
                                    <input type="text" className="form-control" id="camp-started_by" aria-describedby="emailHelp" value={this.state.form_started_by} onChange={this.started_byChange.bind(this)} placeholder="started by addr"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">end date</small>
                                    <input type="text" className="form-control" id="camp-end_date" aria-describedby="emailHelp" value={this.state.form_end_date} onChange={this.end_dateChange.bind(this)} placeholder="end date"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">unit goals</small>
                                    <input type="text" className="form-control" id="camp-unit_goal" aria-describedby="emailHelp" value={this.state.form_unit_goal} onChange={this.unit_goalChange.bind(this)} placeholder="unit goal"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">unit so far</small>
                                    <input type="text" className="form-control" id="camp-unit_so_far" aria-describedby="emailHelp" value={this.state.form_unit_so_far} onChange={this.unit_so_farChange.bind(this)} placeholder="unit so far"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">wei paid out</small>
                                    <input type="text" className="form-control" id="camp-wei_paid_out" aria-describedby="emailHelp" value={this.state.form_wei_paid_out} onChange={this.wei_paid_outChange.bind(this)} placeholder="wei paid out"></input>
                                    <br /><br />

                                    <small id="emailHelp" className="form-text text-muted text-input-desc">wei in escrow</small>
                                    <input type="text" className="form-control" id="camp-wei_in_escrow" aria-describedby="emailHelp" value={this.state.form_wei_in_escrow} onChange={this.wei_in_escrowChange.bind(this)} placeholder="wei in escrow"></input>
                                    <br /><br />

                                    <br /><br />
                                    {/* <h4 className='text_Contact'>Reason</h4> */}
                                </div>
                                <small id="emailHelp" className="form-text text-muted text-error-contact">{this.state.formErrorReason}</small>
                            </form>
                        </div>
                        <button className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.newCampaignButtonClick} >
                        {/* <i className="fa fa-envelope font_button_contact" aria-hidden="true"></i> */}
                        New Campaign
                        </button>
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

export default SubCampaign;
