import React, {Component} from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { getImage } from "Service/Service";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadButton } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { AppContainer, Image } from "./App.styled";
import "react-toastify/dist/ReactToastify.css";

export class App extends Component {

  state = {
    query: "",
    hits: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
    largeImageURL: "",
    isShowButton: false
  }

  async componentDidUpdate(_, prevState){
    const { query, page } = this.state
    if(prevState.query !== query || prevState.page !== page){
      try{
        this.setState({isLoading: true})
        const { totalHits, hits: newHits } = await getImage(query, page)
        this.setState(prevState => ({hits: [...prevState.hits, ...newHits], totalHits}))
      }
      catch (error) {console.log(error);}
      finally{
        this.setState({ isLoading: false })
        const { totalHits, hits: newHits } = await getImage(query, page)
        if (
          (prevState.hits.length === 0 && newHits.length === totalHits) ||
          (prevState.hits.length !== 0 && newHits.length < 12)
        ) {
          toast.info('No more images this category');
        }
      }
    }
}

  handleFormSubmit = (q) => {
      this.setState({query: q, hits:[], page: 1, isShowButton: false})
  }

  toggleModal =(largeImageURL = "") =>{
    this.setState({largeImageURL: largeImageURL})
  }

  handleNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
 

  render(){
    const { hits, isLoading, totalHits, largeImageURL, tag } = this.state;
    const isShowBtn = !isLoading && hits.length !== totalHits;
    return (
      <AppContainer>
        <Searchbar onSubmit = {this.handleFormSubmit}/>
        {hits.length >0 && 
          (<ImageGallery cards={hits} handleClickCard={this.toggleModal}/>)}
        {isShowBtn && 
          (<LoadButton onClick={this.handleNextPage} disabled={isLoading}/>
        )}
        {largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <Image src={largeImageURL} alt={tag} />
          </Modal>
        )}
        {isLoading && <Loader/>}
        <ToastContainer />
      </AppContainer>
    );
  }
};
