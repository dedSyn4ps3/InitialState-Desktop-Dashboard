import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Overview from './Overview'
import Info from './Info'
import Webdash from './Webdash'
import Sideview from './Sideview';

class MainRouter extends Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path="/" component={Overview}/>
                <Route exact path="/info" component={Info}/>
                <Route exact path="/dash" component={Webdash}/>
            </Switch>
        </div>)
    }
}
export default MainRouter