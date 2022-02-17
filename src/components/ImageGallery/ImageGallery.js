import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ openItem, imageList }) {
  return (
    <ul className={s.gallery__list}>
      {imageList.map(({ webformatURL, tags, id }) => {
        return (
          <li key={id} onClick={openItem} className={s.gallery__item}>
            <GalleryItem userImageURL={webformatURL} tags={tags} id={id} />
          </li>
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  id: PropTypes.number,
  openItem: PropTypes.func,
};
