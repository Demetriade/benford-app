import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
  const [encodedImage, setEncodedImage] = React.useState("");

  const handleChange = (newFile) => {
    setImage(newFile[0])
  }
  
  async function sendImage() {
    setIsLoading(true)
    await convertBase64()
    // https://2ymo7jpddd.execute-api.us-east-1.amazonaws.com/production/image
    // http://localhost:5000/api/image
    /*let response = await fetch("/image", {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({"uploadedImage": encodedImage})
    })
    console.log("Response", response)
    let body = response.body
    console.log("Body", body)
    body = JSON.parse(body)
    setData(body.percents)
    setIsLoading(false)*/
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    axios.post("/image", JSON.stringify({"uploadedImage": encodedImage}), {
          headers: headers
        })
          .then(response => { 
            console.log(response.data)
            setData(response.data.percents)
            setIsLoading(false) })
          .catch(error => { console.log(error)
                            setIsLoading(false) })
  }

  async function convertBase64() {
    // encode the file using the FileReader API
    const reader = new FileReader();
    if (data) {
      reader.onloadend = () => {
        // use a regex to remove data url part
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        setEncodedImage(base64String)
        console.log("image converted", base64String)
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
        : <p></p>}
    </div>
  );
}

export default Home;