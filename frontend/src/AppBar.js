import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#145ea8',
  },
  drawerPaper: {
    backgroundColor: '#0f4c8a',
  },
  drawerLink: {
    color: 'white',
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
  },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  list: {
    width: 250,
  },
  listHeader: {
    color: "white",
    fontSize: "20px"
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <Typography variant="h6" className={classes.title}>
              Benford's law
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    

      <Drawer classes={{ paper: classes.drawerPaper }} anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List subheader={
            <ListSubheader className={classes.listHeader} component="div">
              Options
            </ListSubheader>
          }>
            <Link to='/'>
              <ListItem button key={'home'}>
                <ListItemIcon><HomeIcon className={classes.icon} /></ListItemIcon>
                <ListItemText className={classes.drawerLink} primary={'Home'} />
              </ListItem>
            </Link>

            <Link to='/what'>
              <ListItem button key={'What'}>
                <ListItemIcon><HelpIcon className={classes.icon} /></ListItemIcon>
                <ListItemText className={classes.drawerLink} primary={'What?'} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
