import React from 'react';

import { useDispatch } from 'react-redux';

import ShareLocation from '../share-location-form/ShareLocationForm';

import { toggleModal } from '../../store/slices/modalPanelSlice';
import { resetInitialInput } from '../../store/slices/InitialInputSlice';

import classes from './modal.module.css';

const Modal: React.FC = () => {
  const dispatch = useDispatch();

  const backdropClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(resetInitialInput());
    dispatch(toggleModal());
  };

  return (
    <>
      <ShareLocation />
      <div
        className={`${classes.backdrop}`}
        onClick={backdropClickHandler}
      ></div>
    </>
  );
};

export default Modal;
