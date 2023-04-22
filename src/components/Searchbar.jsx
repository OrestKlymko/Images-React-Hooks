import { useState } from 'react';
import css from './css/searchbar.module.css';

export function Searchbar(props) {
  const [searchName, setSearchName] = useState('');

  const onSubmitChange = e => {
    e.preventDefault();
    props.onSearch(searchName);
  };

  const onInputChange = e => {
    setSearchName(e.target.value);
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmitChange}>
        <button type="submit" className={css.sbmButton}>
          <span>Search</span>
        </button>

        <input
          name="searchName"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}
