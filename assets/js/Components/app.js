import React from 'react'
import ReactDOM from 'react-dom'
import WelcomePage from './WelcomePage'
import Header from './Header'
import HeaderTabs from './HeaderTabs'
import classes from '../../css/app.scss'
import { Button } from '@instructure/ui-buttons'
import { connect } from 'react-redux';
import getScanResults from '../Actions'


import '@instructure/canvas-theme';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "items": [],
      "hasReport": false
    }
    //
    this.props.getScanResults();

    this.handleClick = this.handleClick.bind(this);
    this.loadSettings();
  }

  handleClick() {
    this.setState(state => ({
      hasReport: !state.hasReport
    }));
  }

  render() {
    return (
      <div className={`${classes.app}`}>
        <Header/>
        <Display hasReport={this.state.hasReport} action={this.handleClick}/>
      </div>
    )
  }

  loadSettings() {
    const settingsElement = document.querySelector(
      'body > script#toolSettings[type="application/json"]'
    );

    window.toolSettings = {};

    if (settingsElement !== null) {
      window.toolSettings = JSON.parse(settingsElement.textContent);
    }
  }
}

const Display = (props) => {
  const hasReport = props.hasReport;

  if(hasReport) {
    return <HeaderTabs/>
  } else {
    return <div>
      <WelcomePage/>
      <div className={`${classes.buttonContainer}`}>
          <Button onClick={props.action} color="primary" margin="small" textAlign="center">Scan Course</Button>
      </div>
    </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getScanResults: () => dispatch(getScanResults()),
    
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);