// import React, { Component } from 'react';
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
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgData, setLargeImgData] = useState({ src: '', alt: '' });
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    // console.log('useEffect', q);

    let currentPictures = pictures;

    if (q !== '') {
      currentPictures = [];
      getPictures(currentPictures);
    } else {
      getPictures(currentPictures);
    }
  }, [q]);

  const getPictures = async currentPictures => {
      console.log(currentPictures);
    console.log('page', page);
    console.log('q', q);
    if (page !== 1 || q !== '') {
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
          setPictures([...currentPictures, ...arrPhotos]);
          setTotalPages(totalPages);
        }
      } catch {
        console.log('error', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const searchPicture = value => {
    setQ(value);
  };

  const loadMore = () => {
    setPage(page + 1);
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

// export class App extends Component {
//   state = {
//     pictures: [],
//     q: '',
//     isLoading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     largeImgData: { src: '', alt: '' },
//     totalPages: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     let currentPictures = prevState.pictures;
//     if (prevState.q !== this.state.q) {
//       currentPictures = [];
//     }

//     if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
//       try {
//         this.setState({ isLoading: true });
//         const addPictures = await fetchPictureWithQuery(
//           this.state.q,
//           this.state.page
//         );

//         let totalPages = Math.ceil(addPictures.totalHits / 12);

//         if (addPictures.hits.length === 0) {
//           toast.error('Sorry,we did not find...');
//         } else {
//           const arrPhotos = [];
//           addPictures.hits.map(item =>
//             arrPhotos.push({
//               id: item.id,
//               webformatURL: item.webformatURL,
//               largeImageURL: item.largeImageURL,
//               tags: item.tags,
//             })
//           );

//           this.setState({
//             pictures: [...currentPictures, ...arrPhotos],
//             totalPages: totalPages,
//           });
//         }
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }
//   }

//   searchPicture = value => {
//     this.setState({
//       q: value,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   shareSrcForModal = (srcLarge, altLarge) => {
//     this.setState({ largeImgData: { src: srcLarge, alt: altLarge } });
//   };

//   render() {
//     const {
//       pictures,
//       isLoading,
//       error,
//       showModal,
//       largeImgData,
//       page,
//       totalPages,
//     } = this.state;

//     return (
//       <>
//         {error && <p>Whoops, something went wrong: {error.message}</p>}
//         <Toaster />
//         <SearchBar onSubmit={this.searchPicture} />
//         {isLoading && (
//           <CirclesWithBar
//             height="100"
//             width="100"
//             color="#4fa94d"
//             outerCircleColor="#4fa94d"
//             innerCircleColor="#4fa94d"
//             barColor="#4fa94d"
//             ariaLabel="circles-with-bar-loading"
//             visible={true}
//           />
//         )}
//         {pictures.length > 0 ? (
//           <>
//             <ImageGallery
//               pictures={pictures}
//               onImgClick={this.toggleModal}
//               shareSrcForModal={this.shareSrcForModal}
//             />
//             {page < totalPages ? <Button onClick={this.loadMore} /> : null}
//           </>
//         ) : null}

//         {showModal && (
//           <Modal
//             src={largeImgData.src}
//             alt={largeImgData.alt}
//             onClose={this.toggleModal}
//           />
//         )}
//       </>
//     );
//   }
// }
