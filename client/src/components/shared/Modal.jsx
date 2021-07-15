import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Post from '../Post.jsx';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function ComposeModal(props) {
  const classes = useStyles();

  return (
    <Modal
      open={true}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={true}>
        <div className={classes.paper}>
          <div className="modal-header">
            <h2>{props.header}</h2>
            <Button endIcon={<CloseIcon />} role="button" onClick={props.handleOpenAndClose}></Button>
          </div>
          {props.body}
        </div>
      </Fade>
    </Modal>
  );
}

ComposeModal.propTypes = {
  body: PropTypes.elementType,
  header: PropTypes.string,
  handleOpenAndClose: PropTypes.func
};
