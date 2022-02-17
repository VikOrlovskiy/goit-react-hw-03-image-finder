import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import Searchform from "./components/Searchform/Searchform";
import Main from "./components/Main";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import getPictures from "../src/components/PixabayAPI/PixabayApi";
import { Rings } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class App extends Component {
  state = {
    pictures: [],
    name: "",
    page: 1,
    showModal: false,
    modalImage: "",
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { name } = this.state;
    if (prevState.name !== name) {
      this.setState({ loading: true });
      let value = getPictures(name);
      value
        .then((res) => {
          if (res.data.total === 0)
            toast("Could not find images with that name");
          const pictures = res.data;
          this.setState((prevState) => ({
            pictures: pictures.hits,
            page: prevState.page + 1,
          }));
        })
        .finally(this.setState({ loading: false }));
    }
  }
  findPicture = (pictureName) => {
    if (pictureName !== this.state.name) {
      this.setState({ page: 1, name: pictureName });
    }
  };
  loadMore = () => {
    const { name, page } = this.state;
    let value = getPictures(name, page);
    value.then((res) => {
      const pictures = res.data;
      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        page: prevState.page + 1,
      }));
    });
  };
  toglleModal = (e) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      this.filtredLIst(e.target.parentNode.id);
    }
  };
  filtredLIst = (id) => {
    const { pictures } = this.state;
    let value = pictures.find((item) => item.id === Number(id));
    this.setState({ modalImage: value.largeImageURL });
  };
  render() {
    const { showModal, loading, pictures, modalImage } = this.state;
    return (
      <div className="App">
        <Header>
          <Container>
            <Searchform onSubmit={this.findPicture} />
          </Container>
        </Header>
        <Main>
          <Container>
            {loading && (
              <Rings height="100" width="100" color="red" ariaLabel="loading" />
            )}
            <ImageGallery openItem={this.toglleModal} imageList={pictures} />
            {pictures.length > 0 && <Button loag={this.loadMore}></Button>}
          </Container>
        </Main>
        {showModal && (
          <Modal onClose={this.toglleModal} src={modalImage}></Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
