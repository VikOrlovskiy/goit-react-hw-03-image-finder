import PropTypes from "prop-types";
import s from "./Main.module.css";

export default function Main({ children }) {
  return <main className={s.main}>{children}</main>;
}
Main.propTypes = {
  children: PropTypes.object,
};
