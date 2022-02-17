import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import s from "./Searchform.module.css";

export default class Searchform extends Component {
  state = { name: "" };
  onChengeValue = (e) => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };
  handleSubmit = (evt) => {
    const { name } = this.state;
    evt.preventDefault();
    this.props.onSubmit(name);
    this.resetForm();
  };
  resetForm() {
    this.setState({ name: "" });
  }
  render() {
    const { name } = this.state;
    return (
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormbuttonlabel}>
            <FaSearch />
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          onChange={this.onChengeValue}
          value={name}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}
