import { useSelector, useDispatch } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getFavFlyers, toggleFlyerToFav } from "../utils/flyerUtils";

const Header = () => {
    const [open, setOpen] = React.useState(false);

    const favFlyers = getFavFlyers();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Box sx={{
                height: 200,
                display: 'grid',
                alignContent: 'center',
                paddingLeft: 2
            }}>
                <PersonAddIcon style={{
                    background: '#ccc',
                    borderRadius: '50%',
                    padding: 13,
                }} />
                <Typography variant="h6" gutterBottom>
                    Favorites
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    The list of your preferred flyers
                </Typography>
            </Box>
            <Divider />
            <List>
                {favFlyers && favFlyers.map((flyer, k) => {
                    return (
                        <ListItem key={k} disablePadding>
                            <ListItemButton>
                                <ListItemIcon
                                    onClick={() => toggleFlyerToFav(flyer)}
                                >
                                    <FavoriteIcon />
                                </ListItemIcon>
                                <ListItemText primary={flyer.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" >
                        ShopFully
                    </Typography>

                </Toolbar>
            </AppBar>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>

        </>
    );
};

export default Header;
