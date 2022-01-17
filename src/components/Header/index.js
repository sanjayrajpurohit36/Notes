import "./index.css";

const Header = (props) => {
  const { children } = props;
  return (
    <header className="header-container">
      <div className="header-content-wrapper">{children}</div>
    </header>
  );
};

export default Header;
