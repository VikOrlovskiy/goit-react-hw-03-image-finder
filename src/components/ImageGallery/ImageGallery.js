// import PropTypes from 'prop-types';
import s from "./ImageGallery.module.css";
import GalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ openItem, imageList }) {
  return (
    <ul className={s.gallery__list}>
      {imageList.map(({ webformatURL, tags }, index) => {
        return (
          <li key={index} onClick={openItem} className={s.gallery__item}>
            <GalleryItem userImageURL={webformatURL} tags={tags} />
          </li>
        );
      })}
    </ul>
  );
}
// ContactList.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   number: PropTypes.string,
//   deleteContact: PropTypes.func,
// };
