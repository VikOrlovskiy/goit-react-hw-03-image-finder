import s from "./Header.module.css";

export default function Header({ children }) {
  return <header className={s.header}>{children}</header>;
}
