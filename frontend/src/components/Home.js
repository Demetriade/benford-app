import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import axios from "axios"
import "./Home.css"

const theme = createMuiTheme({
  overrides: {
    MuiDropzoneArea: {
      root: {
        backgroundColor: "#3c3e42",
        width: "75vw",
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

  const handleChange = (newFile) => {
    setImage(newFile)
    console.log(image)
  }
  
  const sendImage = () => {
    console.log("image sent")
    let formData = new FormData()
    formData.append("uploadedImage", image)
    /*axios.post("http://localhost:3001/", formData)
              .then(response => { console.log(response.data) })
              .catch(error => { console.log(error) })*/
  }

  return (
    <div className="home">
        <Typography variant="h3" className="title">
            Try it!
        </Typography>
        <hr />
        <Typography variant="caption" className="explication" style={{display: 'inline-block', fontSize: "medium"}}>
            Select an image from your device to see the degree of fakeness. The result may not be allways right.
        </Typography>
        
        <MuiThemeProvider theme={theme}>
          <DropzoneArea
            onDrop={handleChange}
            showFileNames
            dropzoneText="Drag and drop an image here or click"
            showAlerts={true}
            filesLimit={1} />
        </MuiThemeProvider>

        <Button variant="contained" color="primary" className="sendButton" onClick={sendImage}>
          Process
        </Button>
    </div>
  );
}

export default Home;