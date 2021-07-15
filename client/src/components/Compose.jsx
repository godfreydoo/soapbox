import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Modal from './shared/Modal.jsx';
import Post from './Post.jsx';

export default function Compose() {

  const [showModal, setShowModal] = useState(false);

  const handleOpenAndClose = () => {
    setShowModal(value => !value);
  };

  const body = (
    <>
      <h2>Compose your social media posts</h2>
      <Button role="button" onClick={handleOpenAndClose}> X </Button>
      <Post />
    </>
  );

  return (
    <div>
      <Button endIcon={<CreateIcon />} variant="contained" color="primary" onClick={handleOpenAndClose}>
      </Button>
      {showModal
        ? <Modal component={body} />
        : null}
    </div>
  );
}
