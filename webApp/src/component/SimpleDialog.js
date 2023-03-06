import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Icon from '@mui/material/Icon';



const SimpleDialog = (props) => {
  const { title, itemList, open, onClose } = props;

  const handleClose = () => {
    onClose(-1);
  };

  const handleListItemClick = (idx) => {
    onClose(idx);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        { itemList.map((item, idx) => (
          <ListItem key={`simple-dlg-item-${idx}`} disableGutters>
            <ListItemButton onClick={() => handleListItemClick(idx)}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>star</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  title: PropTypes.string.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


export default SimpleDialog;
export { SimpleDialog };
