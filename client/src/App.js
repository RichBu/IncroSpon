import React, { Component } from 'react';
import IncroSponContract from './contracts/IncroSpon.json'
import getWeb3 from './utils/getWeb3'
import Routes from './components/routes/';


import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
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
    var incroSponContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log('accounts =');
      console.log( accounts );
      incroSponContract.deployed().then((instance) => {
        console.log('deployed');
        console.log(instance);
        incroSponContractInstance = instance

        // Stores a given value, 5 by default.
        return incroSponContractInstance.testSet(15, {from: accounts[0]})
        // incroSponContractInstance.getCampaignsLen.call(accounts[0]) 
        // incroSponContractInstance.set(5, {from: accounts[0]})
      // }).then((result) => {
      //   return incroSponContractInstance.getCampaign_rec(1);
      // }).then((data_rec) => {
      //   console.log('Campaign #0');
      //   console.log(data_rec);
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log('write is successful');
        return incroSponContractInstance.testGet.call()
          // incroSponContractInstance.getCampaignsLen.call(accounts[0])     
      }).then((result) => {
        // Update state with the result.
        console.log('read storedData');
        return this.setState({ storageValue: result.c[0] })
      }).then((result) => {
        return incroSponContractInstance.getCampaignsLen.call();
      }).then((result) => {
        console.log(`total campaigns = ${result.c[0]}`);
        let _camp_id = 1;
        let _name = 'Heart Assoc';
        let _started_by = accounts[0];
        let _end_date = 1001;
        let _unit_goal = 130;
        let _unit_so_far = 0;
        let _wei_paid_out = 0;
        let _wei_in_escrow = 0;
        console.log( `started by ${_started_by}` );
        incroSponContractInstance.setCampaign_rec(_name,  _started_by, _end_date, {from: accounts[0]} );
      }).then((result, err) => {
        console.log(err);
        console.log(result);
        console.log('campaign write is successful');
      }).then((result) => {
        return incroSponContractInstance.getCampaign_rec(1);
      }).then((data_rec) => {
        console.log('Campaign #0');
        console.log(data_rec);
      }).then((result) => {
        //now, try to pull out all the campaigns
        return incroSponContractInstance.getCampaignsLen.call();
      }).then((result) => {
        //now need to loop thru all the campaigns
        console.log('get all the campaigns');
        let numCamp = parseInt(result.c[0]);
        let promises = [];

        for (var i = 0; i < numCamp; i++) {
            promises.push(incroSponContractInstance.getCampaign_rec(i) );
        };
        return Promise.all(promises);
      }).then((data_rec) => {
        for (var i = 0; i < data_rec.length; i++) {
          console.log(data_rec[i]);
        };
      })
    })
  }
  
  
  render() {
    return (
      <div style={{ minWidth: '855px', minHeight: '860px', overflow: 'auto' }} className="App">
      {/* <header className="App-header">
      <h1 className="App-title">Rich Budek</h1>
    </header> */}
      <Routes />
      <p className="App-intro">
      </p>
    </div>

    );
  }
}

export default App;
