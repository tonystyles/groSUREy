import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import NewItem from './NewItem';

const useStyles: (
  props?: any
) => Record<'root' | 'nested', string> = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const ItemList: React.FC = (): JSX.Element => {
  const { groupID }: { groupID?: string | undefined } = useParams();
  const classes: Record<'root' | 'nested', string> = useStyles();
  const [open, setOpen]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);
  const [openForm, setOpenForm]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState<boolean>(true);

  const handleClick: () => void = (): void => {
    setOpen(!open);
  };

  const newItemClick: () => void = (): void => {
    setOpenForm(!openForm);
  }

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
          {open ? <ExpandMore /> : <ExpandLess />}
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
        <ListItem button onClick={newItemClick}>
          {openForm ? <ListItemText primary="Add new item" /> : <ListItemText primary="" />}
          {openForm ? <Fab size="small" color="primary" aria-label="add" onClick={newItemClick}>
            <AddIcon />
          </Fab> : <ExpandLess />}
          <Collapse in={!openForm} timeout="auto" unmountOnExit>
            <NewItem></NewItem>
          </Collapse>
        </ListItem>
      </List>
    </div>
  );
};

export default ItemList;
