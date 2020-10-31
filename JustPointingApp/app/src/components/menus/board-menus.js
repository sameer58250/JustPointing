import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import './menus.css'

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const editItem = () => {
        props.editItem && props.editItem();
        setAnchorEl(null);
    }
    const deleteItem = () => {
        props.deleteItem && props.deleteItem();
        setAnchorEl(null);
    }
    const shareItem = () => {
        props.shareItem && props.shareItem();
        setAnchorEl(null);
    }

    return (
        <div className="retro-menu">
            <IconButton aria-label="settings" onClick={handleClick} className="retro-menu-btn">
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>setAnchorEl(null)}>
                <MenuItem className="retro-menu-item" onClick={editItem}>Edit</MenuItem>
                <MenuItem className="retro-menu-item" onClick={deleteItem}>Delete</MenuItem>
                <MenuItem className="retro-menu-item" onClick={shareItem}>Share</MenuItem>
            </Menu>
        </div>
    );
}
