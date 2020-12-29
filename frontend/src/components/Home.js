import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import BarChart from 'react-easy-bar-chart';
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios"
import "./Home.css"

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

const Home = () => {
  const [image, setImage] = React.useState();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (newFile) => {
    setImage(newFile[0])
  }
  
  const sendImage = () => {
    setIsLoading(true)
    // encode the file using the FileReader API
    const reader = new FileReader();
    if (data) {
      reader.onloadend = () => {
        // use a regex to remove data url part
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        
        console.log("image sent", base64String)
        axios.post("http://localhost:5000/api/image", {"uploadedImage": base64String})
                  .then(response => { 
                    console.log(response.data)
                    setData(response.data.percents)
                    setIsLoading(false) })
                  .catch(error => { console.log(error) })
        };
      reader.readAsDataURL(image);
    }
  }

  return (
    <div className="home">
        <Typography variant="h3" className="title">
            Try it!
        </Typography>
        <hr />
        <Typography variant="caption" className="explication" style={{display: 'inline-block', fontSize: "medium", width: "80vw", marginLeft: "auto", marginRight: "auto"}}>
            Select an image from your device to see the confidence.
        </Typography>
        
        <MuiThemeProvider theme={theme}>
          <DropzoneArea
            onDrop={handleChange}
            showFileNames
            dropzoneText="Drag and drop an image here or click"
            showAlerts={true}
            filesLimit={1} />
        </MuiThemeProvider>
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
        : <p>Your result will appear here</p>}
    </div>
  );
}

export default Home;