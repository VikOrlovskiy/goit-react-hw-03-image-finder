// import PropTypes from 'prop-types';
import s from "./Button.module.css";

export default function Button({ loag }) {
  return (
    <button className={s.Button} type="button" onClick={loag}>
      Load more
    </button>
  );
}
// ContactList.propTypes = {
//   deleteContact: PropTypes.func,
// };
