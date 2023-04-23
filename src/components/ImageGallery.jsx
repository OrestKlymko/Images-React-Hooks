import { ImageGalleryItem } from './ImageGalleryItem.jsx';
import { Loader } from './Loader';
import { LoadMore } from './LoadMore.jsx';
import css from './css/imageGallery.module.css';
import { Modal } from './modal';
import { useEffect, useState } from 'react';

export function ImageGallery(props) {
  const [collection, setCollection] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(null);

  const itemsPerPage = 12;

  useEffect(() => {
    const { searchQuery } = props;

    setPage(1);
    setLoader(true);
    setLoadMore(false);

    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=1&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`;

    fetch(URL)
      .then(r => r.json())
      .then(({ totalHits, hits }) => {
        if (totalHits > 0) {
          setCollection(hits);
          hits.length < totalHits ? setLoadMore(true) : setLoadMore(false);
        } else alert('I can not find image');
      })
      .finally(() => {
        setLoader(false);
      });
  }, [props]);

  const onLoadMore = page => {
    setPage(page);
    const { searchQuery } = props;

    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`;

    fetch(URL)
      .then(r => r.json())
      .then(({ hits, totalHits }) => {
        hits.length < totalHits ? setLoadMore(true) : setLoadMore(false);
        setCollection([...collection, ...hits]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getLargeImg = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModal = ({ showModal }) => {
    setShowModal(showModal);
  };

  return (
    <div>
      {collection && (
        <ul className={css.gallery}>
          {collection.map(element => (
            <ImageGalleryItem
              collection={element}
              key={element.id}
              getLargeImg={getLargeImg}
            />
          ))}
        </ul>
      )}
      {loader && <Loader />}
      {loadMore && <LoadMore onLoadMore={onLoadMore} page={page} />}
      {showModal && (
        <Modal
          getLargeImg={largeImageURL}
          modal={closeModal}
          optionModal={showModal}
        />
      )}
    </div>
  );
}
