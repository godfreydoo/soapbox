import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Modal from './Posting/Modal.jsx';
import Post from './Post.jsx';

export default function Compose() {

  const [showModal, setShowModal] = useState(false);

  const handleOpenAndClose = () => {
    setShowModal(value => !value);
  };

  const body = (
    <Post />
  );

  return (
    <div>
      <Button endIcon={<CreateIcon />} variant="contained" color="primary" onClick={handleOpenAndClose}></Button>
      {showModal
        ? <Modal body={body} header="Compose your social media posts" handleOpenAndClose={handleOpenAndClose}/>
        : null}
    </div>
  );
}
