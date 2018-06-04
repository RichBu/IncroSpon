
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './../main/';
import SubME from './../sub_me/';
import SubEE from './../sub_ee/';
import SubEC from './../sub_ec/';
import SubMA from './../sub_ma/';
import SubSA from './../sub_sa/';
import SubUN from './../sub_unity/';
import SubPC from './../sub_pc/';
import SubCNC from './../sub_cnc/';
import SubFS from './../sub_fs/';
import SubContact from './../sub_contact/';
import SubAbout from './../sub_about/';
import SubInfo from './../sub_info/';

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
                            <Route exact path='/Sub-MechEng' component={SubME} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-ElectEng' component={SubEE} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-EngCalc' component={SubEC} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-MobApps' component={SubMA} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-SysArch' component={SubSA} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-Unity' component={SubUN} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-PC' component={SubPC} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-CNC' component={SubCNC} />
                        </Switch>
                        <Switch>
                            <Route exact path='/Sub-FullStack' component={SubFS} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </Router >
        </div>
    )
}

export default Routes;