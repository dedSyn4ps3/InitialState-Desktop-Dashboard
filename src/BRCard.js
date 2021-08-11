import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import Divider from '@material-ui/core/Divider';

class BRCard extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      btemp: '',
      bhum: '',
    }
  }

  componentDidMount() {
    this.updateValues();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  updateValues = () => {
    let access = localStorage.getItem("access_key");
    let bucket = localStorage.getItem("bucket_key");

    fetch("https://api.init.st/data/v1/events/latest?accessKey=" + access + "&bucketKey=" + bucket)
      .then(response => { return response.json() })
      .then(data => {        
        this.setState({ btemp: data["Bedroom-Temperature"]['value'] });
        this.setState({ bhum: data["Bedroom-Humidity"]['value'] });     
        this.intervalID = setTimeout(this.updateValues.bind(this), 60000);
      })
      .catch(error => {
        console.log("[!] Error occured while fetching data >>> " + error);
      });
  };

  render() {
    return (
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="./images/bed.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bedroom
          </Typography>
          <Divider/>
          <Stack direction='row' spacing={2} sx={{paddingTop:5}}>
            <img src="./images/thermometer.png" style={{ width: 70, heigh: 70 }} /><Typography style={{ fontSize: 34 }}>{this.state.btemp}</Typography>
            <img src="./images/humidity2.png" style={{ width: 70, height: 70 }} /><Typography style={{ fontSize: 34 }}>{this.state.bhum}</Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }
}

export default BRCard;