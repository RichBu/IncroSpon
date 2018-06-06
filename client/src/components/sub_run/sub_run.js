import React from "react";
import IncroSponContract from './../../contracts/IncroSpon.json'
import getWeb3 from './../../utils/getWeb3'
import './sub_run.css';


var incroSponContract;
var incroSponContractInstance;
var matchPart_rec = [];


class SubRun extends React.Component {
    constructor(props) {
        super(props);
        // this.categoryClick = this.categoryCick.bind(this);
        this.state = {
            ethConv: 582.53,
            xCoord: 0,
            yCoord: 0,
            event_start_loc: 0,
            event_start_addr: '',
            event_stop_loc: 0,
            event_stop_addr: '',
            event_dist: '',

            event_wei_per_unit: null,
            event_wei_per_unit_str: null,
            event_eth_per_unit: null,
            event_usd_per_unit: null,
            event_tot_wei: null,
            event_tot_wei_str: null,
            event_tot_eth_: null,
            event_tot_usd: null,
            event_qty_units: 0,

            form_sel_camp_id: '',
            form_sel_name: '',
            form_sel_started_by: '',
            form_acct_bal_wei: '',
            form_acct_bal_usd: 0,

            formSpon_camp_id: '',
            formSpon_addr_spon: '',
            formSpon_addr_part: '',
            formSpon_addr_pay_to: '',
            formSpon_unit: 0,
            formSpon_wei_per_unit: 0,
            formSpon_wei_in_escrow: 0,
            formSpon_usd_per_unit: 0,
            formSpon_eth_per_unit: 0,
            formSpon_usd_in_escrow: 0,
            formSpon_eth_in_escrow: 0,

            formSpon_p_camp_id: '',
            formSpon_p_name_part: '',
            formSpon_p_addr_part: '',
            formSpon_p_unit: 0,
            formSpon_p_unit_goal: 0,
            formSpon_p_date_start: 0,
            formSpon_p_date_end: 0,

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
                    usd_in_escrow: 0,
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
            ],

            eventList: [
                {
                camp_id: 0,
                addr_part: 0,
                addr_spon: 0,
                date_event: 0,
                unit: 0,
                qty_unit: 0,
                wei_paid: 0
                }
            ],

            sponsorList: [
                {
                camp_id: 0,
                addr_spon: 0,
                addr_part: 0,
                addr_pay_to: 0,
                unit: 0,
                wei_per_unit: 0,
                wei_in_escrow: 0
                }
            ]
        };
        this.pathProd = 'https://portfolio-richbu.herokuapp.com';
        this.pathDev = 'http://localhost:3006';
        this.useProd = true;
        this.startEvtButtonClick = this.startEvtButtonClick.bind(this);
        this.stopEvtButtonClick = this.stopEvtButtonClick.bind(this);
        this.calcEvtButtonClick = this.calcEvtButtonClick.bind(this);
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
            this.setState({
                accounts: _accounts,
                form_addr_part: _accounts[0]
            });
        
            incroSponContract.deployed().then((instance) => {
                console.log('deployed');
                console.log(instance);
                incroSponContractInstance = instance;

                return incroSponContractInstance.getBalance.call()
            }).then((result) => {
                console.log('result of balance call');
                console.log(result);
                console.log(this.state.web3);       
                // const bal_wei = this.state.web3.utils.BN(result);
                const bal_wei = result;
                const bal_wei_BN = new this.state.web3.utils.toBN(result);
                console.log(`after big number = ${bal_wei}`);
                const bal_eth = this.state.web3.utils.fromWei(bal_wei_BN);
                console.log(`balance in eth: ${bal_eth}`);
                const bal_usd = parseFloat(bal_eth) * this.state.ethConv;
                console.log(`balance in USD = ${bal_usd}`);
                this.setState( {
                    form_acct_bal_wei: bal_wei_BN.toString(),
                    form_acct_bal_usd: bal_usd,
                });
                //this.state.form_acct_bal

                return incroSponContractInstance.getNumCampaignForParticipant.call(this.state.form_addr_part)
            }).then((result) => {
                //how many matches
                let numCamp = parseInt(result.c[0]);
                console.log(`num of campaigns = ${numCamp}`);
                let promises = [];

                for (var i = 0; i < numCamp; i++) {
                    promises.push(incroSponContractInstance.getParticipantForParticipant_rec.call(this.state.form_addr_part,i));
                };
                return Promise.all(promises);
            }).then((data_rec) => {
                //these are all the matching camp_id for the addr_part fed in
                let numCamp = data_rec.length;
                console.log(`camp len = ${numCamp}`);
                matchPart_rec = [];
                for (var i = 0; i < data_rec.length; i++) {
                    matchPart_rec.push(data_rec[i]);
                    console.log(data_rec[i][0] );
                    console.log(`match_part = ${matchPart_rec}` );
                };
                //now have all of the camp_id's pushed into the array,
                //so need to pull out all of the campaign records that match 
                let promises = [];
                for (var i = 0; i < numCamp; i++) {
                    promises.push(incroSponContractInstance.getCampaign_rec.call(matchPart_rec[i][0]));
                };
                return Promise.all(promises);
            }).then((data_rec) => {
                //now have all of the campaign recs that match the addr_part.
                let campArray = [];
                for (var i = 0; i < data_rec.length; i++) {
                    let tempVal = parseInt(data_rec[i][6]);
                    const bal_wei_BN = new this.state.web3.utils.toBN(tempVal);
                    const bal_eth = this.state.web3.utils.fromWei(bal_wei_BN);
                    const bal_usd = parseFloat(bal_eth) * this.state.ethConv;
    
                    campArray.push(
                        {
                            camp_id: i,
                            name: data_rec[i][0],
                            started_by: data_rec[i][1],
                            end_date: '',
                            unit_goal: parseInt(data_rec[i][3]),
                            unit_so_far: parseInt(data_rec[i][4]),
                            wei_paid_out: parseInt(data_rec[i][5]),
                            wei_in_escrow: parseInt(data_rec[i][6]),
                            usd_in_escrow: bal_usd
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
                    this.setState( {
                        form_addr_part: accounts[0]
                    });
                });
            }).then((result) => {
                //have accounts, now see how many participant matches there are
                return incroSponContractInstance.getNumCampaignForParticipant(this.state.form_addr_part);
            }).then((result) => {
                //got the number of matches back

            }); 
        });
    }


    componentDidMount() {
        console.log('at Campaign');
        document.title = "IncroSpon-Campaign";
        //load the proper projects
    }


    resetFormValues() {
        incroSponContractInstance.setSponsor_rec(
                this.state.formSpon_camp_id,
                this.state.formSpon_addr_spon,
                this.state.formSpon_addr_part,
                this.state.formSpon_addr_pay_to,
                this.state.formSpon_unit,
                this.state.formSpon_wei_per_unit,
                this.state.formSpon_wei_in_escrow,
            {from: this.state.form_addr_spon} ).then((result) => {
                incroSponContractInstance.deposit( this.state.formSpon_wei_in_escrow, 
                    {from: this.state.formSpon_addr_spon, value: this.state.formSpon_wei_in_escrow});
            }).then((result) => {
                //deposit was made, now need to update the campaign
                //uses value from sponsor for wei_in_escrow, and goals from form
                return incroSponContractInstance.updRecvCampaign_rec(
                    this.state.formSpon_camp_id,
                    this.state.formSpon_p_unit_goal,
                    this.state.formSpon_wei_in_escrow,
                    {from: this.state.formSpon_addr_spon}
                 );
            }).then((result) => {
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
                    this.setState( {
                        form_addr_part: accounts[0]
                     } );
                });                
            });
    }
    

    loadPartToState(_camp_id) {
        //this function pulls out all of the participants for a campaign
        let numPart;
        // this.state.web3.eth.getAccounts((error, _accounts) => {
        //     //used this to start the string of promises
        //     console.log(`error = ${error}`);
        //     console.log(`accounts = ${_accounts}`);
            // Promise.all([incroSponContractInstance.getParticipantsLen()])
            console.log('before getting record');
            Promise.all([ incroSponContractInstance.getParticipantsLen.call()  ])
        .then((result2) => {
            console.log(`participants length=${result2}`);
            console.log(result2);
            return incroSponContractInstance.getNumParticipantForCampaign(_camp_id);
        }).then((result) => {
            // console.log('num of participants for camp = ');
            // console.log(result);
            numPart = parseInt(result.c[0]);
            console.log(`num of part for this campaign = ${numPart}`);
            let promises = [];
            // return incroSponContractInstance.getParticipantInCampaign_rec.call( 0,0 );
            for (var i = 0; i < numPart; i++) {
                promises.push( incroSponContractInstance.getParticipantInCampaign_rec( _camp_id, i ) );
            };
            return Promise.all(promises);        
        }).then((data_rec) => {
            console.log('data records ****');
            console.log(data_rec);
            console.log(`data rec len = ${data_rec.length}`);
            let partArray = [];
            for (var i = 0; i < data_rec.length; i++) {
                let tempStr1 = this.state.form_addr_part.toLowerCase();
                let tempStr2a = data_rec[i][1];
                let tempStr2b = tempStr2a.toLowerCase();

                if ( tempStr1==tempStr2b )  {
                    partArray.push(
                        {
                            camp_id: parseInt(data_rec[i][0]), 
                            addr_part: data_rec[i][1],
                            name_part: data_rec[i][2],
                            unit: parseInt(data_rec[i][3]),
                            unit_goal: parseInt(data_rec[i][4]),
                            date_start: parseInt(data_rec[i][5]),
                            date_end: parseInt(data_rec[i][6])
                        }
                    );    
                }
            };
            console.log('*** part array ***');
            console.log(partArray);
            this.setState({
                partList: partArray
            }, () => console.log(this.state.partList));            
        }).then((result) => {
            //all of the participant records have been read in, now
            //read in the event logs
            return incroSponContractInstance.getNumEventPayLogsForCampaign(_camp_id);
        }).then((result) => {
            //number of events
            let numEventLogs = parseInt(result.c[0]);
            console.log(`num of events for this campaign = ${numEventLogs}`);
            let promises = [];
            // return incroSponContractInstance.getParticipantInCampaign_rec.call( 0,0 );
            for (var i = 0; i < numEventLogs; i++) {
                promises.push( incroSponContractInstance.getEventPayLogsInCampaign_rec( _camp_id, i ) );
            };
            return Promise.all(promises);        
        }).then((data_rec) => {
            console.log('event pay logs ****');
            console.log(data_rec);
            console.log(`event pay log len = ${data_rec.length}`);
            let eventLogArray = [];
            for (var i = 0; i < data_rec.length; i++) {
                let tempStr1 = this.state.form_addr_part.toLowerCase();
                let tempStr2a = data_rec[i][1];
                let tempStr2b = tempStr2a.toLowerCase();

                if ( tempStr1==tempStr2b )  {
                    eventLogArray.push(
                        {
                            camp_id: parseInt(data_rec[i][0]), 
                            addr_part: data_rec[i][1],
                            addr_spon: data_rec[i][2],
                            date_event: parseInt(data_rec[i][3]),
                            unit: parseInt(data_rec[i][4]),
                            qty_unit: parseInt(data_rec[i][5]),
                            wei_paid: data_rec[i][6],
                        }
                    );    
                }
            };
            console.log('*** event log ***');
            console.log(eventLogArray);
            this.setState({
                eventList: eventLogArray
            }, () => console.log(this.state.eventList));                    
        }).then((result) => {
            //all of the participant records have been read in, now
            //read in all the sponsors
            console.log('hit number of sponsors');
            console.log(`incoming camp id = ${_camp_id}`);
            return incroSponContractInstance.getNumSponsorsForCampaign(_camp_id);
        }).then((result) => {
            //number of sponsors
            let numSponsors = parseInt(result.c[0]);
            console.log(`num of sponsors for this campaign = ${numSponsors}`);
            let promises = [];
            // return incroSponContractInstance.getParticipantInCampaign_rec.call( 0,0 );
            for (var i = 0; i < numSponsors; i++) {
                promises.push( incroSponContractInstance.getSponsorInCampaign_rec( _camp_id, i ) );
            };
            return Promise.all(promises);        
        }).then((data_rec) => {
            console.log('sponsors list ****');
            console.log(data_rec);
            console.log(`sponsors list len = ${data_rec.length}`);
            let sponsorArray = [];
            for (var i = 0; i < data_rec.length; i++) {
                let tempStr1 = this.state.form_addr_part.toLowerCase();
                let tempStr2a = data_rec[i][1];
                let tempStr2b = tempStr2a.toLowerCase();

                if ( tempStr1==tempStr2b )  {
                    let wei_per_unit_BN = new this.state.web3.utils.toBN(data_rec[i][4]);
                    let _wei_per_unit_eth = this.state.web3.utils.fromWei(wei_per_unit_BN);
                    let _wei_per_unit_usd = parseFloat(_wei_per_unit_eth) * this.state.ethConv;
                    let _wei_per_unit_str = wei_per_unit_BN.toString();
                    let wei_in_escrow_BN = new this.state.web3.utils.toBN(data_rec[i][5]);
                    let _wei_in_escrow_eth = this.state.web3.utils.fromWei(wei_in_escrow_BN);
                    let _wei_in_escrow_usd = parseFloat(_wei_in_escrow_eth) * this.state.ethConv;
                    let _wei_in_escrow_str = wei_in_escrow_BN.toString();
                    sponsorArray.push(
                        {
                            camp_id: _camp_id,
                            addr_spon: data_rec[i][0],
                            addr_part: data_rec[i][1],
                            addr_pay_to: data_rec[i][2],
                            unit: parseInt(data_rec[i][3]),
                            wei_per_unit: data_rec[i][4],
                            wei_per_unit_str: _wei_per_unit_str,
                            wei_per_unit_usd: _wei_per_unit_usd,
                            wei_in_escrow: data_rec[i][5],
                            wei_in_escrow_str: _wei_in_escrow_str,
                            wei_in_escrow_usd: _wei_in_escrow_usd
                        }
                    );    
                }
            };
            console.log('*** sponsors ***');
            console.log(sponsorArray);
            this.setState({
                sponsorList: sponsorArray
            }, () => console.log(this.state.sponsorList));                    
        })
    }    


    event_distChange(event) {
        this.setState({event_dist: event.target.value});
    }

    addr_sponChange(event) {
        this.setState({formSpon_addr_spon: event.target.value});
    }


    addr_pay_toChange(event) {
        this.setState({formSpon_addr_pay_to: event.target.value});
    }


    recalcDonations() {
        let ethConv = this.state.ethConv;
        let USDunit = parseFloat(this.state.formSpon_usd_per_unit);
        let ETHunit = USDunit / ethConv; 
        let ETHunit_str = ETHunit.toFixed(8);
        let USDtot = USDunit * parseFloat(this.state.formSpon_p_unit_goal);
        let ETHtot = USDtot / ethConv;
        console.log('conversions');
        console.log(this.state.web3.utils.toWei('1','ether'));
        let WEItot = this.state.web3.utils.toWei(ETHtot.toString(), 'ether');
        console.log(WEItot);
        let WEIunit = this.state.web3.utils.toWei(ETHunit_str.toString(), 'ether');
        this.setState( {
            formSpon_eth_per_unit: ETHunit,
            formSpon_usd_in_escrow: USDtot,
            formSpon_eth_in_escrow: ETHtot,
            formSpon_wei_per_unit: WEIunit,
            formSpon_wei_in_escrow: WEItot
        });
    }



    usd_per_unitChange(event) {
        this.setState({formSpon_usd_per_unit: event.target.value});
        //do all calculations
        this.recalcDonations();
    }


    addr_partChange(event) {
        this.setState({form_addr_part: event.target.value});
    }


    name_partChange(event) {
        this.setState({form_name_part: event.target.value});
    }


    unitChange(event) {
        this.setState({formSpon_unit: event.target.value});
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


    calcEvtButtonClick = (event) => {
        let _qty_units = this.state.event_dist;
        let _tot_usd = _qty_units * this.state.event_usd_per_unit;
        let _tot_eth = _tot_usd / this.state.ethConv;
        let _tot_eth_str = _tot_eth.toString();
        let _tot_wei = this.state.web3.utils.toWei(_tot_eth_str);
        let _tot_wei_str = _tot_wei.toString();

        this.setState({
            event_qty_units: _qty_units,
            event_tot_usd: _tot_usd,
            event_tot_eth: _tot_eth,
            event_tot_wei: _tot_wei,
            event_tot_wei_str: _tot_wei_str
        })        
    }


    stopEvtButtonClick = (event) => {
        this.calcEvtButtonClick();
    }


    startEvtButtonClick = (event) => {
        event.preventDefault();
        this.setState({
            event_start_addr: '467 W. 2nd Street, Elmhurst IL 60126',
            event_stop_addr: '467 W. 2nd Street, Elmhurst IL 60126',
            event_dist: 0,
        });
        //now update all of the units
        //using only the first sponsor, will have to loop thru all sponsors

        let wei_per_unit_BN = new this.state.web3.utils.toBN(this.state.sponsorList[0].wei_per_unit);
        let _eth_per_unit = this.state.web3.utils.fromWei(wei_per_unit_BN);
        let _usd_per_unit = parseFloat(_eth_per_unit) * this.state.ethConv;
        let _wei_per_unit_str = wei_per_unit_BN.toString();

        let _tot_usd = this.state.event_qty_units * this.state.event_usd_per_unit;
        let _tot_eth = _tot_usd / this.state.ethConv;
        let _tot_eth_str = _tot_eth.toString();
        let _tot_wei = this.state.web3.utils.toWei(_tot_eth_str);
        let _tot_wei_str = _tot_wei.toString();

        this.setState({
            event_wei_per_unit: wei_per_unit_BN,
            event_wei_per_unit_str: _wei_per_unit_str,
            event_eth_per_unit: _eth_per_unit,
            event_usd_per_unit: _usd_per_unit,

            event_qty_units: 0,
            event_tot_usd: null,
            event_tot_eth: null,
            event_tot_wei: null,
            event_tot_wei_str: null
        })
    
    }
    

    donateButtonClick = (event) => {
        event.preventDefault();
        console.log('button pressed = donate button');
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
        this.loadPartToState( _camp_id );
    }


    selectPartButtonClick = ( _camp_id, _name_part, _addr_part, _unit, _unit_goal, _date_start, _date_end ) => {
        this.setState( {
            formSpon_p_camp_id: _camp_id,
            formSpon_p_name_part: _name_part,
            formSpon_p_addr_part: _addr_part,
            formSpon_p_unit: _unit,
            formSpon_p_unit_goal: _unit_goal,
            formSpon_p_date_start: _date_start,
            formSpon_p_date_end: _date_end,
            formSpon_addr_pay_to: this.state.form_sel_started_by
        })
        // this.loadPartToState( _camp_id );
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
                    <h3>Running During Event</h3>
                </div>
                <div className="subMenuHead">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-10'>
                            <br />
                            <h4 className='text_Campaign'>
                                As a participant this is where you run your event.
                            </h4>
                        </div>
                    </div>
                </div>


                <div className="subMenuHead">
                    <hr className='line_Campaign' />
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4 className='text_Campaign'><strong>Running during an event:</strong></h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            <h4 className='text_Campaign'>Your ether address has been read in as a participant. </h4>
                            <h4 className='text_Campaign'>The list of campaigns shown is for your address. Select a campaign on the left, and then you can run an event.</h4>
                            <br/>
                            <h5  className='text_Campaign'>
                            Current total contract escrow balance: {this.state.form_acct_bal_wei} (in wei) or {this.state.form_acct_bal_usd} (in usd)
                            </h5>
                            <h5  className='text_Campaign'>
                            Your eth address: {this.state.form_addr_part}
                            </h5>
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
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>usd in escrow:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.usd_in_escrow}</h4><br />
                                        <br />
                                    </div>
                                    <br />
                                    <hr className='line_Campaign' />
                                </div>
                            )}
                            
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6' style={{ textAlign: 'left', align: 'left', alignContent: 'left' }} >
                            <br />
                            <br />
                            <h4 className='text_Campaign'>Campaign selected</h4>
                            <h5 style={{ display: 'inline' }} className='text_Campaign'>campaign id:</h5>
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>{this.state.form_sel_camp_id}</h4><br />
                            <h5 style={{ display: 'inline' }} className='text_Campaign'>campaign name:</h5>
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>{this.state.form_sel_name}</h4><br />
                            <h5 style={{ display: 'inline' }} className='text_Campaign'>started by:</h5>
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>{this.state.form_sel_started_by}</h4><br />
                            
                            <hr className='line_Campaign' />
                            <h4 className='text_Campaign'>Your Record </h4>
                            <hr className='line_Campaign' />
                            {this.state.partList.map((b) =>
                                <div className='row' className='row-hover' onClick={() => this.selectPartButtonClick( b.camp_id, b.name_part, b.addr_part, b.unit, b.unit_goal, b.date_start, b.date_end) }>
                                    <div key={b.addr_part} style={{ textAlign: 'left' }} >
                                        <br />
                                        <br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>campaign id:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.camp_id}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>participant name:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.name_part}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>address of part:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.addr_part}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>units</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.unit}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>unit goal:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.unit_goal}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>date start:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.date_start}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>date_end:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.date_end}</h4><br />
                                        <br />
                                    </div>
                                    <br />
                                    <hr className='line_Campaign' />
                                </div>
                            )}

                            {/* Sponsor list */}
                            <hr className='line_Campaign' />
                            <h4 className='text_Campaign'>Sponsor List </h4>
                            <hr className='line_Campaign' />

                            {this.state.sponsorList.map((b) =>
                                <div className='row' className='row-hover' >
                                    <div key={b.addr_spon} style={{ textAlign: 'left' }} >
                                        <br />
                                        <br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>campaign id:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.camp_id}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>sponsor address:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.addr_spon}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>address of part:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.addr_part}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>address to pay to</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.addr_pay_to}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>unit:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.unit}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>wei per unit:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_per_unit_str}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>usd per unit:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_per_unit_usd}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>wei in escrow:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_in_escrow_str}</h4><br />
                                        <h5 style={{ display: 'inline' }} className='text_Campaign'>usd in escrow:</h5>
                                        <h4 style={{ display: 'inline' }} className='text_Campaign'>{b.wei_in_escrow_usd}</h4><br />
                                        <br />
                                    </div>
                                    <br />
                                    <hr className='line_Campaign' />
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className='row'>
                        <hr className='line_Campaign' />
                        <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1' style={{ textAlign: 'left' }} >
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-5 col-xs-5' style={{ textAlign: 'left' }} >
                            <hr className='line_Campaign' />
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>Your event logs:</h4><br /><br />
                            <hr className='line_Campaign' />
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>Todays event:</h4><br /><br /><br />
                            <h5 style={{ display: 'inline' }} className='text_Campaign'>Your units are miles, so start now</h5><br /><br />
                            <button style={{ display: 'block' }} data-tip='start the event' className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.startEvtButtonClick} >
                            <i className="fa fa-play font_button_contact" aria-hidden="true"></i>
                                Start Event
                            </button>
                            <br />
                            <form style={{ textAlign: 'left', align: 'left', alignContent: 'left' }}>
                                <small id="emailHelp" className="form-text text-muted text-input-desc">start location: </small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_start_addr}  placeholder="start location"></input>

                                <small id="emailHelp" className="form-text text-muted text-input-desc">curr location</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_start_addr}  placeholder="curr location"></input>

                                <small id="emailHelp" className="form-text text-muted text-input-desc">total distance</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_dist} onChange={this.event_distChange.bind(this)} placeholder="total distance"></input>
                            </form>
                            <br />

                            <button style={{ display: 'inline' }} data-tip='start the event' className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.calcEvtButtonClick} >
                            <i className="fa fa-calculator font_button_contact" aria-hidden="true"></i>
                                Calc
                            </button>
                            <button style={{ display: 'inline' }} data-tip='start the event' className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.stopEvtButtonClick} >
                            <i className="fa fa-stop font_button_contact" aria-hidden="true"></i>
                                Stop Event
                            </button>
                            <hr className='line_Campaign' />
                        </div>
                        <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1' style={{ textAlign: 'left' }} >
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4' style={{ textAlign: 'left' }} >
                            <hr className='line_Campaign' />
                            <h4 style={{ display: 'inline' }} className='text_Campaign'>What you have earned today:</h4><br /><br />
                            <form style={{ textAlign: 'left', align: 'left', alignContent: 'left' }}>
                                <small id="emailHelp" className="form-text text-muted text-input-desc">pledge (in WEI) per unit</small>
                                <input type="text" className="form-control" id="part-date_start" aria-describedby="emailHelp" value={this.state.event_wei_per_unit_str}  placeholder="wei per unit"></input>

                                <small id="emailHelp" className="form-text text-muted text-input-desc">pledge (in eth) per unit (1 eth = $582.53)</small>
                                <input type="text" className="form-control" id="part-date_start" aria-describedby="emailHelp" value={this.state.event_eth_per_unit}  placeholder="ether per unit"></input>

                                <small id="emailHelp" className="form-text text-muted text-input-desc">pledge (in US Dollar) per unit</small>
                                <input type="text" className="form-control" id="part-unit_goal" aria-describedby="emailHelp" value={this.state.event_usd_per_unit} onChange={this.usd_per_unitChange.bind(this)} placeholder="usd per unit"></input>
                                <br />
                                <small id="emailHelp" className="form-text text-muted text-input-desc">units earned now</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_qty_units}  placeholder="unit earned now"></input>
                                
                                <br />
                                <small id="emailHelp" className="form-text text-muted text-input-desc">total WEI</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_tot_wei_str}  placeholder="wei in escrow"></input>
                                
                                <small id="emailHelp" className="form-text text-muted text-input-desc">total ether</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_tot_eth}  placeholder="eth in escrow"></input>

                                <small id="emailHelp" className="form-text text-muted text-input-desc">total amount (in USD)</small>
                                <input type="text" className="form-control" id="part-date_end" aria-describedby="emailHelp" value={this.state.event_tot_usd}  placeholder="usd in escrow"></input>
                            </form>
                            <br />
                            <button style={{ display: 'inline' }} data-tip='money is moved IMMEDIATELY when you click button' className="btn btn-default btn-lg bttnHeader bttn-contact" onClick={this.donateButtonClick} >
                                <i className="fa fa-cloud-upload font_button_contact" aria-hidden="true"></i>
                                Save
                            </button>
                            
                            <hr className='line_Campaign' />
                        </div>    
                        <div className='col-lg-1 col-md-1 col-sm-1 col-xs-1' style={{ textAlign: 'left' }} >
                        </div>
                    </div>
                    
                    <div className='row' style={{ padding: '0px 20px 0px 20px' }} >
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

export default SubRun;
