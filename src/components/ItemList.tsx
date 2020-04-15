import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}),
);

export default function ItemList() {
  const { groupID } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <h2>Now viewing list {groupID}</h2>
      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         Items in this list
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemText primary="Apples" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Oranges" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Condoms" />
        {open ? <ExpandMore /> : <ExpandLess /> }
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Magnum" />
          </ListItem>
        </List>
      </Collapse>
    </List>

    </div>
  );
}
