import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { LoaderContainer } from "./Loader.styled";

export const Loader = () => {
  return(
    <LoaderContainer>
      <ThreeDots color="#3f51b5"/>
    </LoaderContainer>
  )
}