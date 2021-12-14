import { Link } from "react-router-dom";
import nuberLogo from "../../images/logo.svg";

const Header = () => (
  <header className="py-4">
    <div className="w-full max-w-screen-xl mx-auto">
      <Link to="/">
        <img src={nuberLogo} className="w-52 mb-10" alt="Nuber Eats" />
      </Link>
      im the header
    </div>
  </header>
);

export default Header;
