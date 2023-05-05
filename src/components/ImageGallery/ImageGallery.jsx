import React from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImgGallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export const ImageGallery = ({cards, handleClickCard}) => {
  return ( 
    <ImgGallery>
      {cards.map(({id, webformatURL, tags, largeImageURL }) =>(
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={()=>handleClickCard(largeImageURL)}
        />
      ))}
    </ImgGallery>
  )
}

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleClickCard: PropTypes.func.isRequired,
};