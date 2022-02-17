// import PropTypes from 'prop-types';
import s from "./ImageGalleryItem.module.css";
// import ContactListItem from '../ContactListItem';

export default function ImageGalleryItem({ userImageURL, tags }) {
  return (
    <div>
      <img
        className={s.ImageGalleryItem__image}
        src={userImageURL}
        alt={tags}
      />
    </div>
  );
}
// ContactList.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   number: PropTypes.string,
//   deleteContact: PropTypes.func,
// };
