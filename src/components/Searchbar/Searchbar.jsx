import { useState } from "react";
import { toast } from "react-toastify";
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";
import { Header, SearchForm, SearchButton, SearchButtonLabel, SearchInput } from "./Searchbar.styled";

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

const handelQueryChange = e => {
  setQuery(e.currentTarget.value.toLowerCase())
}

const handleSubmit = (e) => {
  e.preventDefault();

  if(query.trim() === ''){
    toast('Enter data to search');
    return
  }
  onSubmit(query)
  setQuery('')
}

  return(
    <Header onSubmit  = {handleSubmit}>
      <SearchForm>
        <SearchButton type="submit">
          <FiSearch style={{ width: 20, height: 20 }} />
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>
        <SearchInput
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value = { query }
          onChange = {handelQueryChange}
        />
      </SearchForm>
    </Header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};