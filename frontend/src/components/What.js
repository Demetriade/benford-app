import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import "./What.css";
import imageUrl from "../static/image/benf.PNG"


const What = () => {
    return (
      <div className="what">
        <Typography variant="h3" className="title">
          What is Benford's law?
        </Typography>
        <hr />
        <div className="explication">
          <Typography variant="caption" style={{display: 'inline-block', fontSize: "medium"}}>
              In the world of fraud detection, there is a widely used mathematical law. This one might seem magical at first glance, but it's a bit more complex.
              This is called Benford's law. For the popularized explanation, imagine that we take the first digit of each number in a data set. These numbers are
              between 1 and 9. If we calculate the percentage of their frequency and sort them in order of digits on an "x" axis, the percentage of "1" will be 
              around 30%. The other percentages will decrease until the digit "9". The frequency of number nine should be around 5%.
              For a better idea, the graph under allows us to view this probability distribution.
          </Typography>
          
          <br />

          <Card className="cardImg">
            <CardHeader title="The distribution of the digits" />
            <CardMedia className="media" image={imageUrl} title="Benford's law" style={{ height: "15hv", width: "10wv" }} component="img" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                From https://en.wikipedia.org/wiki/Benford's_law.
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="caption" style={{display: 'inline-block', fontSize: "medium"}}>
              On this site, we can experiment with this law with pictures. We can either choose an image on our device or search for an Instagram post. In both scenarios we can see
              the distribution of the digits and obtain a degree of falsity. Specifically, after sending the image, the site uses all the first digits of each pixel color code
              and calculate their frequency. Then, the site compares the results with Benford's law to estimate a factor. This allows to see the authenticity of an image. This 
              is one of the many applications of this particular law. 
          </Typography>
        </div>
      </div>
    );
  }
  
  export default What;