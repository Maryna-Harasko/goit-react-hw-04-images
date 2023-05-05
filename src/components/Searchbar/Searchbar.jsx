import React, { Component } from "react";
import { toast } from "react-toastify";
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";
import { Header, SearchForm, SearchButton, SearchButtonLabel, SearchInput } from "./Searchbar.styled";

export class Searchbar extends Component {

  state = {
    query: ''

  }

  handelQueryChange = e => {
    this.setState ({query: e.currentTarget.value.toLowerCase() })
  }

  submit = (e) => {
    e.preventDefault();

    if(this.state.query.trim() === ''){
      toast('Enter data to search');
      return
    }
    this.props.onSubmit(this.state.query)
    this.setState({query: ''})
  }

  render() {
  return (
    <Header onSubmit  = {this.submit}>
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
          value = { this.state.query }
          onChange = {this.handelQueryChange}
        />
      </SearchForm>
    </Header>
  )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};