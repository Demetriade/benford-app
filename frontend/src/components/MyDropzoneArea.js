import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


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


export default function MyDropzoneArea() {
  const [files, setFiles] = React.useState([]);
  
  function handleChange(){
    //setFiles({files: "files"});
  }
  return (
    <MuiThemeProvider theme={theme}>
      <DropzoneArea
        onChange={handleChange()}
        showFileNames
        dropzoneText="Drag and drop an image here or click"
        showAlerts={true}
        filesLimit={1} />
      </MuiThemeProvider>
  )
}