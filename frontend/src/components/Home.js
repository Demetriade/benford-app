import React from 'react'
import MyDropzoneArea from "./MyDropzoneArea"
import Typography from '@material-ui/core/Typography';
import "./Home.css"


const Home = () => {
  return (
    <div className="home">
        <Typography variant="h3" className="title">
            Try it!
        </Typography>
        <hr />
        <Typography variant="p" className="explication">
            You can select an image from your device or select one from Instagram to see the degree of fakeness
        </Typography>
        <MyDropzoneArea />
    </div>
  );
}

export default Home;