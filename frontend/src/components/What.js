import React from 'react'
import Typography from '@material-ui/core/Typography';
import "./What.css";

const What = () => {
    return (
      <div className="what">
        <Typography variant="h3" className="title">
          What is Benford's law?
        </Typography>
        <hr />
        <div className="explication">
          <Typography variant="p" style={{display: 'inline-block'}}>
              In the world of fraud detection, there is a mathemetic law that is use a lot. This one may look like magic at first look, but it is a little more complex.
              Of course, this is Benford's law. The basic explication are if we take the first digit of every numbers in a data set, then we calculate the pourcentage of
              their occurence and sort them by digit order, the pourcentage of ones will be around 30%, the other pourcentage will decrease until the digit nine that his pourcentage will be around 5 pourcent.
              (Look the graph under) 
          </Typography>
          <br />
          <Typography variant="p" style={{display: 'inline-block'}}>
              blablablablablablablablablabla 
          </Typography>
        </div>
      </div>
    );
  }
  
  export default What;