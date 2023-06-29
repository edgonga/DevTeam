import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  const toLogIn = () => navigate("/");
  const toSignUp = () => navigate("/signup");
  const toHome = () => navigate("/home");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");

  return (
    <div className="nav">
      <div className="navbar-main">
        <div>
          <button onClick={toHome}>
            <AiOutlineHome />{" "}
          </button>
        </div>
        {!isLoggedIn ? (
          <div>
            <button onClick={toLogIn}>
              {" "}
              <BiLogIn />{" "}
            </button>
            <button onClick={toSignUp}>
              {" "}
              <BsPersonAdd />{" "}
            </button>
          </div>
        ) : (
          <div>
            <h3>{userName}</h3>
            <button>LOGOUT</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
