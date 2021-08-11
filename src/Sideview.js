import './App.css';
import Iframe from './Iframe';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { styled, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Stack from '@material-ui/core/Stack';
import MuiDrawer from '@material-ui/core/Drawer';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarsIcon from '@material-ui/icons/Stars';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240;

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

const Sideview = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const url = localStorage.getItem("sideview_url");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', color: '#ffffff', bgcolor: '#0c2d48' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ bgcolor: '#274472' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Sideview
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link to="/">
                        <ListItem button key='Overview'>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Overview' />
                        </ListItem>
                    </Link>
                    <Link to="/dash">
                        <ListItem button key='Webdash'>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Webdash' />
                        </ListItem>
                    </Link>
                    <Link to="/side">
                        <ListItem button key='Sideview'>
                            <ListItemIcon>
                                <QueuePlayNextIcon />
                            </ListItemIcon>
                            <ListItemText primary='Sideview' />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/info">
                        <ListItem button key='Credentials'>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary='Credentials' />
                        </ListItem>
                    </Link>
                    <ListItem button key='More'>
                        <ListItemIcon>
                            <MoreVertIcon />
                        </ListItemIcon>
                        <ListItemText primary='More' />
                    </ListItem>
                    <ListItem button key='Acknowledgements'>
                        <ListItemIcon>
                            <StarsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Acknowledgements' />
                    </ListItem>
                </List>
            </Drawer>

            //**************************************************************** Main UI Components ***********************//

            <Box component="root" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box  >
                    <Box sx={{ p: 2 }}>
                        <Stack marginLeft={-65}>
                            <Iframe source={url} />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Sideview;