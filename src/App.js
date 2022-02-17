import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import Searchform from "./components/Searchform/Searchform";
import Main from "./components/Main";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
import getPictures from "../src/components/PixabayAPI/PixabayApi";
export default class App extends Component {
  state = { pictures: [], name: "", page: 1, showModal: false };
  componentDidMount() {
    // let value = getPictures("clouds");
    // value.then((res) => {
    //   const pictures = res.data;
    //   this.setState({ pictures: pictures.hits, page: 1 });
    // });
    console.log("componentDidMount");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    if (prevState.name !== "" && prevState.name !== this.state.name) {
      let value = getPictures(this.state.name);
      value.then((res) => {
        const pictures = res.data;
        this.setState({
          pictures: pictures.hits,
        });
      });
    }
  }
  findPicture = (pictureName) => {
    this.setState({ name: pictureName });
  };
  loadMore = () => {
    let value = getPictures(this.state.name, this.state.page);
    value.then((res) => {
      const pictures = res.data;
      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...pictures.hits],
        page: prevState.page + 1,
      }));
    });
  };
  toglleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    console.log(this.state.page);
    const { showModal } = this.state;
    return (
      <div className="App">
        <Header>
          <Container>
            <Searchform onSubmit={this.findPicture} />
          </Container>
        </Header>
        <Main>
          <Container>
            <ImageGallery
              openItem={this.toglleModal}
              imageList={this.state.pictures}
            />
            {this.state.pictures.length > 0 && <Button loag={this.loadMore} />}
          </Container>
        </Main>
        {showModal && <Modal onClose={this.toglleModal}></Modal>}
      </div>
    );
  }
}
