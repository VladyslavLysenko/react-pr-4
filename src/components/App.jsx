import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPictureWithQuery } from 'api/api';
import { SearchBar } from './SearchBar/SearchBar';
import { CirclesWithBar } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [q, setQ] = useState('');
  const [shouldClean, setShouldClean] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgData, setLargeImgData] = useState({ src: '', alt: '' });
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getPictures = async () => {
      if (q !== '') {
        try {
          setIsLoading(true);
          const addPictures = await fetchPictureWithQuery(q, page);
          let totalPages = Math.ceil(addPictures.totalHits / 12);

          if (addPictures.hits.length === 0) {
            toast.error('Sorry,we did not find...');
          } else {
            const arrPhotos = [];
            addPictures.hits.map(item =>
              arrPhotos.push({
                id: item.id,
                webformatURL: item.webformatURL,
                largeImageURL: item.largeImageURL,
                tags: item.tags,
              })
            );

            setPictures(prevPictures => {
              let currentPictures = prevPictures;
              if (shouldClean) {
                currentPictures = [];
              }

              return [...currentPictures, ...arrPhotos];
            });
            setTotalPages(totalPages);
          }
        } catch {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getPictures();
  }, [error, page, q, shouldClean]);

  const searchPicture = value => {
    setQ(prevQ => {
      setShouldClean(value !== prevQ);
      return value;
    });
  };

  const loadMore = () => {
    setShouldClean(false);
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const shareSrcForModal = (srcLarge, altLarge) => {
    setLargeImgData({ src: srcLarge, alt: altLarge });
  };

  return (
    <>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      <Toaster />
      <SearchBar onSubmit={searchPicture} />
      {isLoading && (
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          visible={true}
        />
      )}
      {pictures.length > 0 ? (
        <>
          <ImageGallery
            pictures={pictures}
            onImgClick={toggleModal}
            shareSrcForModal={shareSrcForModal}
          />
          {page < totalPages ? <Button onClick={loadMore} /> : null}
        </>
      ) : null}

      {showModal && (
        <Modal
          src={largeImgData.src}
          alt={largeImgData.alt}
          onClose={toggleModal}
        />
      )}
    </>
  );
};
