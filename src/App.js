import React, { Component } from "react";
import { Rings } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import Header from "./components/Header";
import Container from "./components/Container";
import Searchform from "./components/Searchform/Searchform";
import Main from "./components/Main";
import ImageGallery from "./components/ImageGallery";
import getPictures from "./components/PixabayAPI/PixabayApi";
import Button from "./components/Button";
import Modal from "./components/Modal";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
export default class App extends Component {
  state = {
    pictures: [],
    name: "",
    page: 1,
    showModal: false,
    modalImage: "",
    status: "idle",
    error: "",
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      this.setState({ status: "pending" });
      let value = getPictures(this.state.name);
      value
        .then((res) => {
          const pictures = res.data;
          if (res.data.total === 0) {
            this.setState({ loadMore: false });
            toast.error("Could not find images with that name");
          }
          this.setState((prevState) => ({
            pictures: pictures.hits,
            page: prevState.page + 1,
            status: "resolved",
            loadMore: true,
          }));
          if (res.data.hits.length < 12) {
            this.setState({ loadMore: false });
          }
        })
        .catch((error) => this.setState({ status: "rejected", error }));
    }
  }
  loadMore = () => {
    const { page, name } = this.state;
    let value = getPictures(name, page);
    value.then((res) => {
      const pictures = res.data;
      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        page: prevState.page + 1,
        loadMore: true,
      }));
      if (res.data.hits.length < 12) {
        this.setState({ loadMore: false });
      }
    });
  };
  toglleModal = (e) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      if (e) {
        this.filtredLIst(e.target.parentNode.id);
      }
    }
  };
  filtredLIst = (id) => {
    const { pictures } = this.state;
    let value = pictures.find((item) => item.id === Number(id));
    this.setState({ modalImage: value.largeImageURL });
  };
  findPicture = (pictureName) => {
    if (pictureName !== this.state.name) {
      this.setState({ name: pictureName, page: 1 });
    }
  };
  render() {
    const { pictures, status, modalImage, showModal, loadMore } = this.state;
    return (
      <div className="App">
        <Header>
          <Container>
            <Searchform onSubmit={this.findPicture} />
          </Container>
        </Header>
        <Main>
          <Container>
            {status === "idle" && <p>please enter name picture</p>}
            {status === "pending" && (
              <Rings
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            )}
            {status === "resolved" && (
              <ImageGallery pictures={pictures} open={this.toglleModal} />
            )}
            {loadMore && <Button loag={this.loadMore} />}
            {showModal && <Modal src={modalImage} onClose={this.toglleModal} />}
          </Container>
        </Main>
        <ToastContainer />
      </div>
    );
  }
}
