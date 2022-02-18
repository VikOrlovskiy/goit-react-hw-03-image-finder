import PropTypes from "prop-types";
import s from "./Header.module.css";

export default function Header({ children }) {
  return <header className={s.header}>{children}</header>;
}
Header.propTypes = {
  children: PropTypes.object,
};
