
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './../main/';
import SubContact from './../sub_contact/';
import SubAbout from './../sub_about/';
import SubInfo from './../sub_info/';
import SubCampaign from './../sub_campaign/';
import SubParticipant from './../sub_participant/';
import SubSponsor from './../sub_sponsor/';
import SubRun from './../sub_run/';


//import { Redirect } from "react-router-dom";
//import { ReactRedirect } from "react-redirect";
import Header from './../header/';
import Footer from './../footer/';

import React from "react";
import './routes.css';

import ReactTooltip from "react-tooltip";



const Routes = () => {
    return (
        <div style={{ minWidth: '855px' }}> ]
        <ReactTooltip delayShow={100} />
            <Router>
                <div style={{ width: '100%', minHeight: '800px', minWidth: '855px', top: '0px', padding: '0px', margin: '0px' }}>
                    <Header />
                    <main>
                        <Switch>
                            <Route exact path='/' component={Main} />
                        </Switch>
                        <Switch>
                            <Route exact path='/contact' component={SubContact} />
                        </Switch>
                        <Switch>
                            <Route exact path='/about' component={SubAbout} />
                        </Switch>
                        <Switch>
                            <Route exact path='/info' component={SubInfo} />
                        </Switch>
                        <Switch>
                            <Route exact path='/campaigns' component={SubCampaign} />
                        </Switch>
                        <Switch>
                            <Route exact path='/participant' component={SubParticipant} />
                        </Switch>
                        <Switch>
                            <Route exact path='/sponsor' component={SubSponsor} />
                        </Switch>
                        <Switch>
                            <Route exact path='/run' component={SubRun} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router >
        </div>
    )
}

export default Routes;