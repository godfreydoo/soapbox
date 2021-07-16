import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Modal from './Posting/Modal.jsx';
import Post from './Post.jsx';
import { cardStyles, cardStylesOpen, MiniDrawer } from './Sidebar.jsx';
import PropTypes from 'prop-types';

export default function Compose({ open }) {
  let buttonclasses;
  if (open) {
    buttonclasses = cardStylesOpen();
  } else {
    buttonclasses = cardStyles();

  }

  const [showModal, setShowModal] = useState(false);

  const handleOpenAndClose = () => {
    setShowModal(value => !value);
  };

  const body = (
    <Post />
  );

  return (
    <div>
      <Button endIcon={<CreateIcon />} className={buttonclasses.compose} variant="contained" color="primary" onClick={handleOpenAndClose}>{open ? 'Compose' : null}</Button>
      {showModal
        ? <Modal body={body} header="Compose your social media posts" handleOpenAndClose={handleOpenAndClose}/>
        : null}
    </div>
  );
}

Compose.propTypes = {
  open: PropTypes.bool,
};
