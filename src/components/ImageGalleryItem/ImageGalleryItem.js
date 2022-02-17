import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ userImageURL, tags, id }) {
  return (
    <div id={id}>
      <img
        className={s.ImageGalleryItem__image}
        src={userImageURL}
        alt={tags}
      />
    </div>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  userImageURL: PropTypes.string,
  tags: PropTypes.string,
};
