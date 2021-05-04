import React from 'react';
import { ipcRenderer } from 'electron';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import MaximizeIcon from '@material-ui/icons/Maximize';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    visibility: 'hidden'
  },
  tab: {
    maxWidth: '70%',
    WebkitAppRegion: 'no-drag'
  },
  drag: {
    WebkitAppRegion: 'drag',
  },
  noDrag: {
    WebkitAppRegion: 'no-drag'
  }
}));

export default function Layout(): React.ReactElement {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.drag} color="default">
        <Toolbar variant="dense" disableGutters={true}>

          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.tab}
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>

          <Typography className={classes.title}>
            HLXY-Toolbox
          </Typography>

          <Toolbar variant="dense" className={classes.noDrag} disableGutters={true}>
            <IconButton color="inherit" onClick={() => { ipcRenderer.send('min'); }}>
              <MinimizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => { ipcRenderer.send('max'); }}>
              <MaximizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => { ipcRenderer.send('close'); }}>
              <CloseIcon />
            </IconButton>
          </Toolbar>

        </Toolbar>
      </AppBar>
      <Toolbar variant="dense"/>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
