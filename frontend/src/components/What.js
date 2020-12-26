import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import "./What.css";
import imageUrl from "../static/images/benf.PNG"


const What = () => {
    return (
      <div className="what">
        <Typography variant="h3" className="title">
          What is Benford's law?
        </Typography>
        <hr />
        <div className="explication">
          <Typography variant="caption" style={{display: 'inline-block', fontSize: "medium"}}>
              In the world of fraud detection, there is a mathemetic law that is use a lot. This one may look like magic at first look, but it is a little more complex.
              Of course, this is Benford's law. The basic explication are if we take the first digit of every numbers in a data set, then we calculate the pourcentage of
              their occurence and sort them by digit order, the pourcentage of ones will be around 30%, the other pourcentage will decrease until the digit nine that his pourcentage will be around 5 pourcent.
              (Look the graph under) 
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
              On this site, we can experiment this law with images. More precisely, if we take the first digit of every pixel color codes, then we are able to apply
              benford's law to see the distribution of digits. This is one of many application of this particular law. 
          </Typography>
        </div>
      </div>
    );
  }
  
  export default What;