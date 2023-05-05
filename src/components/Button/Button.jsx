import React from "react";
import { Button } from "./Button.styled";
import PropTypes from 'prop-types';


export const LoadButton = ({onClick}) => {
  return(
    <Button type="button" onClick={onClick}>Load more</Button>
  )
}

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};