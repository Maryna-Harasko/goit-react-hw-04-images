import React from "react";
import { ImgGalleryItem, Image } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({webformatURL, tags, onClick}) => {
  return(
    <ImgGalleryItem>
      <Image src={webformatURL} alt={tags} onClick={onClick}/>
    </ImgGalleryItem>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};