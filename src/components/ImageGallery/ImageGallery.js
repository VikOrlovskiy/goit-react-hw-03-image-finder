// import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItem";
import React, { Component } from "react";
import getPictures from "../PixabayAPI/PixabayApi";
import { toast } from "react-toastify";
import Button from "../Button";
import Modal from "../Modal";
import { Rings } from "react-loader-spinner";
export default class imageGallery extends Component {
  state = {
    pictures: [],
    name: this.props.name,
    page: 1,
    showModal: false,
    modalImage: "",
    status: "idle",
    error: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ status: "pending", page: 1 });
      let value = getPictures(this.props.name);
      value
        .then((res) => {
          if (res.data.total === 0)
            toast.error("Could not find images with that name");
          const pictures = res.data;
          this.setState((prevState) => ({
            pictures: pictures.hits,
            page: prevState.page + 1,
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ status: "rejected", error }));
    }
  }
  loadMore = () => {
    const { page } = this.state;
    let value = getPictures(this.props.name, page);
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
    const { pictures, status, modalImage, showModal } = this.state;
    if (status === "idle") {
      return <p>please enter name picture</p>;
    }
    if (status === "pending") {
      return (
        <Rings height="100" width="100" color="grey" ariaLabel="loading" />
      );
    }
    if (status === "rejected") {
      toast.error(`${this.state.error}`);
      return;
    }
    if (status === "resolved") {
      return (
        <>
          <ul className={s.gallery__list}>
            {pictures.map(({ webformatURL, tags, id }) => {
              return (
                <li
                  key={id}
                  onClick={this.toglleModal}
                  className={s.gallery__item}
                >
                  <GalleryItem
                    userImageURL={webformatURL}
                    tags={tags}
                    id={id}
                  />
                </li>
              );
            })}
          </ul>
          {pictures.length > 0 && <Button loag={this.loadMore} />}
          {showModal && <Modal src={modalImage} onClose={this.toglleModal} />}
        </>
      );
    }
  }
}

// idle
// pending
// rejected
// resolved
