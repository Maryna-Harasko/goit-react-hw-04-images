import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { getImage } from 'Service/Service';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import { AppContainer, Image } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isShowButton, setShowButton] = useState(false);

  const handleFormSubmit = q => {
    setQuery(q);
    setHits([]);
    setPage(1);
    setShowButton(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImage = async () => {
      try {
        setLoading(true);
        const { totalHits, hits } = await getImage(query, page);
        setHits(prevHits => [...prevHits, ...hits]);
        setTotalHits(totalHits);
        setShowButton(true);
        if (hits.length < 12 || (hits.length !== 0 && hits.length < 12)) {
          setShowButton(false);
          toast.info('No more images this category');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [query, page]);

  const handleNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      {hits.length > 0 && (
        <ImageGallery cards={hits} handleClickCard={toggleModal} />
      )}
      {isShowButton && (
        <LoadButton onClick={handleNextPage} disabled={isLoading} />
      )}
      {largeImageURL && (
        <Modal onClose={toggleModal}>
          <Image src={largeImageURL} />
        </Modal>
      )}
      {isLoading && <Loader />}
      <ToastContainer />
    </AppContainer>
  );
};
