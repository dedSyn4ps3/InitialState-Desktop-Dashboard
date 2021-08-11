import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import PieChartIcon from '@material-ui/icons/PieChart';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Pail, ShieldKey, ToggleSwitchOff, PlusCircle } from 'mdi-material-ui'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const linkStyle = {
    textDecoration: "none",
    color: 'black'
};

const myStyles = {
    saveButton: {
        background: 'linear-gradient(150deg, #0d7722 40%, #1b8aa3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    clearButton: {
        background: 'linear-gradient(45deg, #cc0c0c 30%, #e57a16 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
};

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket_key: '',
            access_key: '',
            webdash_url: '',
            toggle_feed: '',
            extra_feed: '',
            drawerVisible: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.loadValues();
    }

    setDrawerVisible = (visible) => {
        this.setState({ drawerVisible: visible });
    }

    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };

    saveValues = () => {
        localStorage.setItem("bucket_key", this.state.bucket_key);
        localStorage.setItem("access_key", this.state.access_key);
        localStorage.setItem("webdash_url", this.state.webdash_url);
        localStorage.setItem("toggle_feed", this.state.toggle_feed);
        localStorage.setItem("extra_feed", this.state.extra_feed);
    }

    loadValues = () => {
        let i = localStorage.getItem("bucket_key")

        if (i === null) {
            this.setState({ bucket_key: '' });
        } else {
            this.setState({ bucket_key: i });
        }

        i = localStorage.getItem("access_key")
        if (i === null) {
            this.setState({ access_key: '' });
        } else {
            this.setState({ access_key: i });
        }

        i = localStorage.getItem("webdash_url")
        if (i === null) {
            this.setState({ webdash_url: '' });
        } else {
            this.setState({ webdash_url: i });
        }

        i = localStorage.getItem("extra_feed")
        if (i === null) {
            this.setState({ extra_feed: '' });
        } else {
            this.setState({ extra_feed: i });
        }

        i = localStorage.getItem("toggle_feed")
        if (i === null) {
            this.setState({ toggle_feed: '' });
        } else {
            this.setState({ toggle_feed: i });
        }
    }


    handleSubmit() {
        this.saveValues();
        console.log(this.state);
        this.loadValues();
        this.render();
    }

    handleDelete() {
        localStorage.clear();
        this.loadValues();
        this.render();
    }

    render() {

        const { classes } = this.props;
        const { drawerVisible } = this.state;

        return (
            <Box sx={{ display: 'flex', color: '#ffffff', bgcolor: '#0c2d48'}}>
                <CssBaseline />
                <AppBar position="fixed" open={this.state.drawerVisible}>
                    <Toolbar sx={{ bgcolor: '#274472' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.setDrawerVisible(!drawerVisible)}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(this.state.drawerVisible && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Credentials
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={this.state.drawerVisible}>
                    <DrawerHeader>
                        <IconButton onClick={() => this.setDrawerVisible(!drawerVisible)}>
                            <ChevronRightIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Link to="/" style={linkStyle}>
                            <ListItem button key='Overview'>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary='Overview' />
                            </ListItem>
                        </Link>
                        <Link to="/dash" style={linkStyle}>
                            <ListItem button key='Webdash'>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary='Webdash' />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/info" style={linkStyle}>
                            <ListItem button key='Credentials'>
                                <ListItemIcon>
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                <ListItemText primary='Credentials' />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>

                    //**************************************************************** Main UI Components ***********************//

                <Box component="root" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <Box marginLeft={-50} >
                        <div>
                            <Box sx={{ p: 2 }}>
                                <Stack sx={{ marginLeft: -50 }}>
                                    <Card variant="outlined" sx={{ height: 860, }}>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image="./images/vault.png"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                API Keys & Credentials
                                            </Typography>
                                            <Stack>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <InputLabel htmlFor="webdash-url">Webdash</InputLabel>
                                                    <OutlinedInput
                                                        id="webdash-url"
                                                        value={this.state.webdash_url}
                                                        onChange={this.handleChange('webdash_url')}
                                                        startAdornment={<InputAdornment position="start"><PieChartIcon /></InputAdornment>}
                                                        label="Webdash"
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <InputLabel htmlFor="bucket">Bucket Key</InputLabel>
                                                    <OutlinedInput
                                                        id="bucket"
                                                        value={this.state.bucket_key}
                                                        onChange={this.handleChange('bucket_key')}
                                                        startAdornment={<InputAdornment position="start"><Pail /></InputAdornment>}
                                                        label="Bucket Key"
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <InputLabel htmlFor="access">Access Key</InputLabel>
                                                    <OutlinedInput
                                                        id="access"
                                                        value={this.state.access_key}
                                                        onChange={this.handleChange('access_key')}
                                                        startAdornment={<InputAdornment position="start"><ShieldKey /></InputAdornment>}
                                                        label="Access Key"
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <InputLabel htmlFor="toggle">Toggle Feed</InputLabel>
                                                    <OutlinedInput
                                                        id="toggle"
                                                        value={this.state.toggle_feed}
                                                        onChange={this.handleChange('toggle_feed')}
                                                        startAdornment={<InputAdornment position="start"><ToggleSwitchOff /></InputAdornment>}
                                                        label="Toggle Feed"
                                                    />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 1 }}>
                                                    <InputLabel htmlFor="extra">Extra Feed</InputLabel>
                                                    <OutlinedInput
                                                        id="extra"
                                                        value={this.state.extra_feed}
                                                        onChange={this.handleChange('extra_feed')}
                                                        startAdornment={<InputAdornment position="start"><PlusCircle /></InputAdornment>}
                                                        label="Extra Feed"
                                                    />
                                                </FormControl>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.handleSubmit}
                                                    className={classes.saveButton}
                                                    sx={{ marginTop: 5 }}
                                                >
                                                    SAVE
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.handleDelete}
                                                    className={classes.clearButton}
                                                    sx={{ marginTop: 5 }}
                                                >
                                                    CLEAR
                                                </Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box >
        );
    };
};

Info.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(myStyles)(Info);