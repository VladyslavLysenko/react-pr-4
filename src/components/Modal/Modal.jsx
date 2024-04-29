import { Component } from 'react';
import { createPortal } from 'react-dom';

import css from 'styles.module.css';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt, onClose } = this.props;

    return createPortal(
      <div
        className={css.Overlay}
        onClick={() => {
          onClose();
        }}
      >
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
