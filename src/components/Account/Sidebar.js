import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState(0);

  // Hàm xử lý khi click vào mục
  const handleActive = (index) => {
    setActive(index);
  };
  return (
    <main>
      <div className="sidebar">
        <ul className="nav flex-column">
          {["Account", "Your Orders", "My Address"].map((item, index) => (
            <li
              key={index}
              className="nav-item"
              onClick={() => handleActive(index)}
            >
              <Link
                className={`nav-link ${active === index ? "selected" : ""}`}
                to={
                  index === 0
                    ? "/account"
                    : index === 1
                    ? "/account/orders"
                    : "/account/address"
                }
              >
                <i className="mr-10"></i>
                {item}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <Link className="nav-link">
              <i className="mr-10"></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Sidebar;
