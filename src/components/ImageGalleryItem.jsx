import { Component } from 'react';
import css from './css/imageGallery.module.css';

export class ImageGalleryItem extends Component {
  onClickImage = largeImageURL => {
    this.props.getLargeImg(largeImageURL);
  };

  render() {
    const { webformatURL, name, largeImageURL } = this.props.collection;
    return (
      <li onClick={() => this.onClickImage(largeImageURL)}>
        <img src={webformatURL} alt={name} className={css.gallery__image} />
      </li>
    );
  }
}