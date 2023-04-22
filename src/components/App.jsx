import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import css from './css/app.module.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className={css.wrapper}>
      <Searchbar onSearch={onSearch} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}
