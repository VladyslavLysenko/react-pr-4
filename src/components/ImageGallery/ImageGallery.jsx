import css from 'styles.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, shareSrcForModal, onImgClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={nanoid()}
          picture={picture}
          onImgClick={onImgClick}
          shareSrcForModal={shareSrcForModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  shareSrcForModal: PropTypes.func,
  onImgClick: PropTypes.func,
};
