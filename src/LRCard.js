import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import Divider from '@material-ui/core/Divider';


class LRCard extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      bucket_key: '',
      access_key: '',
      ltemp: '',
      lhum: '',
    }
  }

  componentDidMount() {
    this.updateValues();
    console.log(this.state);
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
        this.setState({ ltemp: data["LivingRoom-Temperature"]['value'] });
        this.setState({ lhum: data["LivingRoom-Humidity"]['value'] });    
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
          image="./images/living-room.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Living Room
          </Typography>
          <Divider/>
          <Stack direction='row' spacing={2} sx={{paddingTop:5}}>
            <img src="./images/thermometer.png" style={{ width: 70, heigh: 70 }} /><Typography sx={{ fontSize: 34 }}>{this.state.ltemp}</Typography>
            <img src="./images/humidity2.png" style={{ width: 70, height: 70 }} /><Typography sx={{ fontSize: 34 }}>{this.state.lhum}</Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }
}

export default LRCard;