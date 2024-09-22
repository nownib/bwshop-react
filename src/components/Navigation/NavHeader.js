import React from "react";
import "./NavHeader.scss";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/images/logo.png";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
import { logoutRedux, setActiveRedux } from "../../redux/action/actions";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "react-loader-spinner";
// import { fetchUserRedux } from "../../redux/action/actions";

const NavHeader = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoading);
  const listProductsInCart = useSelector(
    (state) => state.cart.listProductsInCart
  );
  const listProductsInWishlist = useSelector(
    (state) => state.wishlist.listProductsInWishlist
  );
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(true);
  };

  const hideDropdown = () => {
    setShow(false);
  };

  const handleLogout = async () => {
    let data = await logoutUser(); //clear cookie
    localStorage.removeItem("Bearer"); //clear localstorage
    dispatch(logoutRedux());
    sessionStorage.clear();
    if (data && data.EC === 0) {
      toast.success("Logout successfully!");
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };
  // const handleToggle = () => {
  //   setShowMenu(!showMenu);
  // };
  // const handleOnClick = () => {
  //   setShowMenu(false);
  // };

  const handleClickAccount = () => {
    dispatch(setActiveRedux(0));
    navigate("/account");
  };
  const handleClickOrder = () => {
    dispatch(setActiveRedux(1));
    navigate("/account/orders");
  };
  const handleClickAddress = () => {
    dispatch(setActiveRedux(2));
    navigate("/account/address");
  };

  return (
    <>
      <div className="nav-header">
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
          <Navbar.Brand href="/">
            <div className="logo-container">
              <img src={Logo} alt="logo" width="170" height="75" />
            </div>
          </Navbar.Brand>
          <div className="right-container">
            <Nav className="d-lg-none m-0 p-0">
              <NavLink to="/wishlist" className="p-0 me-2">
                <i class="fa-regular fa-heart group-icon">
                  <span className="notification-badge">
                    {listProductsInWishlist.length > 0
                      ? listProductsInWishlist.length
                      : 0}
                  </span>
                </i>
              </NavLink>
            </Nav>
            <Nav className="d-lg-none m-0 p-0">
              <NavLink to="/cart" className="p-0 me-2">
                <i class="fa-solid fa-cart-shopping group-icon">
                  <span className="notification-badge">
                    {listProductsInCart.length}
                  </span>
                </i>
              </NavLink>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link" end>
                Home
              </NavLink>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
              <NavLink to="/shop" className="nav-link ">
                Shop
              </NavLink>
              <NavLink to="/blog" className="nav-link" end>
                Blog
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </Nav>
            <Nav className="mx-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 search-input"
                  aria-label="Search"
                />
                <Button variant="outline-success">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </Button>
              </Form>
            </Nav>
            <Nav className="d-lg-none">
              {isAuthenticated === true ? (
                <>
                  {isLoading === false ? (
                    <>
                      <NavDropdown
                        title={
                          <span onClick={() => handleClickAccount()}>
                            <i class="fa-regular fa-user group-icon"></i>
                            {user && isLoading === false
                              ? user.account.username
                              : ""}
                          </span>
                        }
                        show={show}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                      >
                        <NavDropdown.Item>
                          <div
                            className="menu-item"
                            onClick={() => handleClickAccount()}
                          >
                            <i class="fa-regular fa-user group-icon"></i>
                            My Account
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <div
                            className="menu-item"
                            onClick={() => handleClickOrder()}
                          >
                            <i class="fa-solid fa-bag-shopping"></i>
                            Order Tracking
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <div
                            className="menu-item"
                            onClick={() => handleClickAddress()}
                          >
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                            Address
                          </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <div
                            className="menu-item"
                            onClick={() => handleLogout()}
                          >
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            Sign out
                          </div>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="loading-container">
                        <Audio
                          height="80"
                          width="80"
                          radius="9"
                          color="green"
                          ariaLabel="loading"
                          wrapperStyle
                          wrapperClass
                        />
                        <div>LOADING DATA ...</div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <NavLink to="/login" className="nav-link">
                  <i class="fa-regular fa-user group-icon"></i>
                  <span>Login</span>
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav className="mx-auto d-none d-lg-flex">
            <NavLink to="/wishlist" className="nav-link">
              <i class="fa-regular fa-heart group-icon">
                <span className="notification-badge">
                  {listProductsInWishlist.length > 0
                    ? listProductsInWishlist.length
                    : 0}
                </span>
              </i>
              <span>Wishlist</span>
            </NavLink>
            <NavLink to="/cart" className="nav-link">
              <i class="fa-solid fa-cart-shopping group-icon">
                <span className="notification-badge">
                  {listProductsInCart.length > 0
                    ? listProductsInCart.length
                    : 0}
                </span>
              </i>
              <span>Cart</span>
            </NavLink>
            {isAuthenticated === true ? (
              <>
                {isLoading === false ? (
                  <>
                    <NavDropdown
                      title={
                        <span onClick={() => handleClickAccount()}>
                          <i class="fa-regular fa-user group-icon"></i>
                          {user && isLoading === false
                            ? user.account.username
                            : ""}
                        </span>
                      }
                      show={show}
                      onMouseEnter={showDropdown}
                      onMouseLeave={hideDropdown}
                    >
                      <NavDropdown.Item>
                        <div
                          className="menu-item"
                          onClick={() => handleClickAccount()}
                        >
                          <i class="fa-regular fa-user"></i>
                          My Account
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div
                          className="menu-item"
                          onClick={() => handleClickOrder()}
                        >
                          <i class="fa-solid fa-bag-shopping"></i>
                          Order Tracking
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div
                          className="menu-item"
                          onClick={() => handleClickAddress()}
                        >
                          <i class="fa-solid fa-location-dot"></i>
                          Address
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div
                          className="menu-item"
                          onClick={() => handleLogout()}
                        >
                          <i class="fa-solid fa-arrow-right-from-bracket"></i>
                          Sign out
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                <i class="fa-regular fa-user group-icon"></i>
                <span>Login</span>
              </NavLink>
            )}
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default NavHeader;
