import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"
import "./Instagram.css"

const theme = createMuiTheme({
  overrides: {
    MuiDropzoneArea: {
      root: {
        backgroundColor: "#3c3e42",
        width: "55vw",
        height: "100px",
        marginRight: "auto",
        marginLeft: "auto"
      },
      icon: {
        color: "white"
      }
    },
  }
});

const Instagram = () => {
  const [image, setImage] = React.useState();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (newFile) => {
    
  }
  
  const sendImage = () => {
    
  }

  return (
    <div className="home">
        <Typography variant="h3" className="title">
            Try with a Instagram post!
        </Typography>
        <hr />
        <Typography variant="caption" className="explication" style={{display: 'inline-block', fontSize: "medium", width: "80vw", marginLeft: "auto", marginRight: "auto"}}>
            You need to enter the username of the profile and then select a post to see the confidence.
        </Typography>
        
        {isLoading ?
          <Button disabled variant="contained" style={{ backgroundColor: "#082745", width: "150px", color: "#8a8a8a", marginLeft: "auto", marginRight: "auto" }} className="sendButton" onClick={sendImage}>
            <CircularProgress color="secondary" />
          </Button>
           : (image ?
            <Button variant="contained" style={{ backgroundColor: "#145ea8", width: "150px", color: "white", marginLeft: "auto", marginRight: "auto" }} className="sendButton" onClick={sendImage}>
            Process
            </Button> : 
              <Button disabled variant="contained" style={{ backgroundColor: "#082745", width: "150px", color: "#8a8a8a", marginLeft: "auto", marginRight: "auto" }} className="sendButton" onClick={sendImage}>
              No image
              </Button>
          )}
        
        {data.length !== 0 ? 
        <div className="cardsResult">
          <Card>
            <CardContent className="confidence" style={{backgroundColor: data.confidence.color}}>
              <Typography style={{"color": "white", textAlign: "center", fontSize: "20px", paddingTop: "5px", paddingBottom: "5px"}} variant="caption">
                  Confidence : {data.confidence.factor}%
              </Typography>
            </CardContent>
          </Card>
          <Card className="cardChart">
            <CardHeader title="Results of digit's distribution" />
            <CardContent>
              <Chart width={'50vw'} height={"400px"} chartType="Bar" loader={<div>Loading Chart</div>} data={data.data} options={data.options} className="barChart" />
              <Typography style={{"color": "#4285f4", textAlign: "left"}} variant="body2" component="p">
                  Theoretical Benford's distribution
              </Typography>
              <Typography style={{"color": "#db4437", textAlign: "left"}} variant="body2" component="p">
                  Image's distribution
              </Typography>
            </CardContent>
          </Card>
        </div>
        : <p></p>}
    </div>
  );
}

export default Instagram;