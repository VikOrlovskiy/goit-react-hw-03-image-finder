import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import Header from "./components/Header";
import Container from "./components/Container";
import Searchform from "./components/Searchform/Searchform";
import Main from "./components/Main";
import ImageGallery from "./components/ImageGallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    name: "",
  };
  findPicture = (pictureName) => {
    if (pictureName !== this.state.name) {
      this.setState({ name: pictureName });
    }
  };
  render() {
    const { name } = this.state;
    return (
      <div className="App">
        <Header>
          <Container>
            <Searchform onSubmit={this.findPicture} />
          </Container>
        </Header>
        <Main>
          <Container>
            <ImageGallery name={name} />
          </Container>
        </Main>
        <ToastContainer />
      </div>
    );
  }
}
