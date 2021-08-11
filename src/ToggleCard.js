import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Stack from '@material-ui/core/Stack';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const myStyles = {
  toggleButton: {
    background: 'linear-gradient(150deg, #0d7722 40%, #1b8aa3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  }
};

class ToggleCard extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      bucket_key: '',
      access_key: '',
      toggle_value: false,
      toggle_label: ''
    }
  }

  componentDidMount() {
    this.getCreds();
    this.updateValues();
    this.setInitialToggle();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getCreds = () => {
    let access = localStorage.getItem("access_key");
    let bucket = localStorage.getItem("bucket_key");

    this.setState({ access_key: access });
    this.setState({ bucket_key: bucket });
  }

  updateValues = () => {
    let access = localStorage.getItem("access_key");
    let bucket = localStorage.getItem("bucket_key");
    let toggle = localStorage.getItem("toggle_feed");

    fetch("https://api.init.st/data/v1/events/latest?accessKey=" + access + "&bucketKey=" + bucket)
      .then(response => { return response.json() })
      .then(data => {
        this.setState({ toggle_value: data[toggle]['value'] });
        this.intervalID = setTimeout(this.updateValues.bind(this), 60000);
      })
      .catch(error => {
        console.log("[!] Error occured while fetching data >>> " + error);
      });
  };

  setInitialToggle = () => {
    const { toggle_value } = this.state;
    if (toggle_value) {
      this.setState({ toggle_label: "ON" })
    } else { this.setState({ toggle_label: "OFF" }) };
  }

  setToggleState = (state) => {
    this.setState({ toggle_value: state });
    if (state) {
      this.setState({ toggle_label: "OFF" })
    } else { this.setState({ toggle_label: "ON" }) };
  }

  postToggleValue() {

    const { toggle_value } = this.state;

    var header = new Headers({
      'Content-Type': 'application/json',
      'X-IS-AccessKey': this.state.access_key,
      'X-IS-BucketKey': this.state.bucket_key,
      'Accept-Version': '~0'
    });

    var body = [
      {
        'key': 'furnace_toggle',
        'value': this.state.toggle_value
      }
    ];

    fetch("https://groker.init.st/api/events", {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body)
    })
      .catch(error => {
        console.log("[!] Error occured while POSTing switch data >>> " + error);
      });

    this.setToggleState(!toggle_value);
  };

  render() {
    const { classes } = this.props;
    const { toggle_label } = this.state;
    return (
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="./images/web-settings.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Furnace Fan Toggle
          </Typography>
          <Divider />
          <Stack sx={{ paddingTop: 5 }}>
            <Button
              variant="contained"
              onClick={() => this.postToggleValue()}
              className={classes.toggleButton}
              sx={{ width: 200 }}
            >
              {toggle_label}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }
}

ToggleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(myStyles)(ToggleCard);