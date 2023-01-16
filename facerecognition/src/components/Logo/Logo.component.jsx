import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.styles.css";

const Logo = () => {
  return (
    <div className="ma4 mt0 tilt-container">
      <Tilt className="br2 shadow-2">
        <div className="tilt-inner pa3">
          <img
            style={{
              paddingTop: "5px",
            }}
            alt="brain-logo"
            src={brain}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
