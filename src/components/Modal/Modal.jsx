import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from 'styles.module.css';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  // }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

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
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { src, alt, onClose } = this.props;

//     return createPortal(
//       <div
//         className={css.Overlay}
//         onClick={() => {
//           onClose();
//         }}
//       >
//         <div className={css.Modal}>
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
