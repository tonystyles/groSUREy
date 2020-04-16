import * as React from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Drawer,
  Divider
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  Settings
} from '@material-ui/icons';
import { AppPropsInterface } from '../utils/interfaces';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewItem from './NewItem';

interface DrawerInterface extends AppPropsInterface {
  drawerOut: boolean;
  setDrawerOut: React.Dispatch<React.SetStateAction<boolean>>;
}


const useStyles: (
  props?: any
) => Record<
  'root' | 'nested' | 'list' | 'fullList' | 'group' | 'settings',
  string
> = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    list: {
      width: 250
    },
    fullList: {
      width: 'auto'
    },
    group: {
      fontWeight: 900
    },
    settings: {
      position: 'absolute',
      bottom: '0px',
      float: 'right'
    }
  })
);

const ItemList: React.FC<DrawerInterface> = ({
  loginState,
  setLoginState,
  username,
  setUsername,
  password,
  setPassword,
  drawerOut,
  setDrawerOut
}): JSX.Element => {
  const { groupID }: { groupID?: string | undefined } = useParams();
  const classes: Record<
    'root' | 'nested' | 'list' | 'fullList' | 'group' | 'settings',
    string
  > = useStyles();
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

  const toggleDrawer: (
    open: boolean
  ) => (
      event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
    ) => void = (open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent
    ): void => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOut(open);
    };

  const list: () => JSX.Element = (): JSX.Element => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem className={classes.group} button key="title">
          <ListItemText className={classes.group} primary="Groups" />
        </ListItem>
        {['Family', 'Friends', 'The bois', 'Obama'].map((text) => (
          <Link
            to={`/list/${text}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List className={classes.settings}>
        <ListItem className={classes.group} button key="settings">
          <Link
            to={`/settings`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItemIcon style={{ float: 'left' }}>
              <Settings />
            </ListItemIcon>
          </Link>
          <Link
            to={`/settings`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItemText className={classes.group} primary="Settings" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
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
      <Button onClick={toggleDrawer(true)}>See Groups</Button>

      <Drawer anchor={'left'} open={drawerOut} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default ItemList;
