import "./Shop.scss";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Audio } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../../services/productService";
import {
  fetchAllProductsRedux,
  fetchProductDetailsRedux,
  addProductToWishlistRedux,
} from "../../redux/action/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Shop = () => {
  const [price, setPrice] = useState([0, 50]);
  const [listCategories, setListCategories] = useState([]);

  const [categoryId, setCategoryId] = useState();
  const [productsFilter, setProductsFilter] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerpage] = useState(10);
  const [applyFilter, setApplyFilter] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const products = useSelector((state) => state.product.listProducts);
  const isLoading = useSelector((state) => {
    return state.product.isLoading;
  });
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  const isError = useSelector((state) => {
    return state.product.isError;
  });
  const dispatch = useDispatch();
  const handleClickProductDetails = (product) => {
    let productId = product.id;
    dispatch(fetchProductDetailsRedux(productId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickAddToWishlist = (productId) => {
    if (isAuthenticated === true) {
      dispatch(addProductToWishlistRedux(productId));
    } else {
      toast.error("You need to login to add products to the wishlist!");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchAllProductsRedux());
  }, []);

  useEffect(() => {
    paginateAndFilterProducts();
    if (applyFilter) {
      setApplyFilter(false);
    }
  }, [products, currentPage, categoryId, applyFilter, sortOption]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const paginateAndFilterProducts = () => {
    let filteredProducts = [...products];
    if (categoryId) {
      const numericCategoryId = Number(categoryId);
      filteredProducts = filteredProducts.filter(
        (item) => item.categoryId === numericCategoryId
      );
    }
    filteredProducts = filteredProducts.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    // Apply sorting
    if (sortOption === "priceAsc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAsc") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    const startOffset = (currentPage - 1) * productsPerPage;
    const endOffset = startOffset + productsPerPage;
    setTotalProducts(filteredProducts);
    setProductsFilter(filteredProducts.slice(startOffset, endOffset));
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnChangeCategory = (value) => {
    setCategoryId(value);
    setCurrentPage(1);
  };

  const getAllCategories = async () => {
    try {
      let response = await fetchAllCategories();
      if (response && response.EC === 0) {
        setListCategories(response.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePrice = (newPrice) => {
    setPrice(newPrice);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setApplyFilter(true);
  };

  const handleClickFilter = () => {
    setApplyFilter(true);
    setCurrentPage(1);
  };

  const handleClickClear = () => {
    setPrice([0, 500]);
    setApplyFilter(false);
    setCurrentPage(1);
    setSortOption("");
    setProductsFilter([...products]);
  };
  const valuetext = (value) => `${value}`;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // const newCount = useSelector((state) => {
  //   return state.counter.count;
  // });

  // const handleIncrease = () => {
  //   dispatch(increaseCounter());
  // };

  return (
    <div className="shop-container">
      {/* <div>Count: {newCount}</div>

      <button onClick={() => handleIncrease()}>Increase Count</button> */}

      <div className="container">
        <div className="row">
          <div className="col-lg-1-5 shop-sidebar">
            <div className="sidebar-price mb-2">
              <h3>Fill by price</h3>
              <div className="price-filter pt-4">
                <Box sx={{ width: "100%", position: "relative" }}>
                  <Typography
                    variant="body2"
                    sx={{ position: "absolute", left: 0, top: 30 }}
                  >
                    {price[0]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ position: "absolute", right: 0, top: 30 }}
                  >
                    {price[1]}
                  </Typography>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={price}
                    onChange={(event) => handleChangePrice(event.target.value)}
                    getAriaValueText={valuetext}
                    min={0}
                    max={50}
                    sx={{
                      color: "#3bb77e",
                      // "& .MuiSlider-thumb": {
                      //   backgroundColor: "secondary.main",
                      // },
                      // "& .MuiSlider-track": {
                      //   backgroundColor: "secondary.main",
                      // },
                    }}
                  />
                </Box>
              </div>
            </div>

            <div className="sidebar-category pt-5 pb-5">
              <h5 className="mb-10">Category</h5>
              <select
                className="form-select"
                onChange={(event) => handleOnChangeCategory(event.target.value)}
              >
                <option value="">All categories</option>
                {listCategories &&
                  listCategories.length > 0 &&
                  listCategories.map((item, index) => {
                    return (
                      <option key={`brand-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="sidebar-btn mt-4">
              <button
                className="btn-filter custome-btn"
                onClick={() => handleClickFilter()}
              >
                Filter
              </button>
              <button
                className="btn-clear custome-btn"
                onClick={() => handleClickClear()}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="col-lg-4-5 shop-product">
            <div className="shop-product-filter">
              <div className="total-product">
                <p>
                  We found <span>{totalProducts.length}</span> items for you!
                </p>
              </div>
              <div className="sort-product">
                <select
                  className="form-select"
                  onChange={() => handleSortChange()}
                  value={sortOption}
                >
                  <option value="">Sort by: Created</option>
                  <option value="priceAsc">Low to High</option>
                  <option value="priceDesc">High to Low</option>
                  <option value="nameAsc">Name: A - Z</option>
                  <option value="nameDesc">Name: Z - A</option>
                </select>
              </div>
            </div>
            <div className="product-container">
              <div className="row">
                {isError === true ? (
                  <>
                    <div>Somgthing wrongs, please try again...</div>
                  </>
                ) : (
                  <>
                    {isLoading === true ? (
                      <>
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
                    ) : (
                      <>
                        {productsFilter && productsFilter.length > 0 ? (
                          <>
                            {productsFilter.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-lg-1-5 col-md-4 col-sm-6 col-12"
                                >
                                  <div className="product-cart-wrap mb-4">
                                    <div className="product-img-wrap">
                                      <div className="product-img">
                                        <Link
                                          to={`/product/${item.id}`}
                                          onClick={() =>
                                            handleClickProductDetails(item)
                                          }
                                        >
                                          <img src={item.imageUrl} alt />
                                        </Link>
                                      </div>
                                      {item.status ? (
                                        <div
                                          className={`product-status ${
                                            item.status === "Trending"
                                              ? "pink"
                                              : "blue"
                                          }`}
                                        >
                                          {item.status}
                                        </div>
                                      ) : (
                                        <div></div>
                                      )}

                                      <div className="product-action">
                                        <span
                                          aria-label="Add To Wishlist"
                                          className="favorite-btn"
                                          onClick={() =>
                                            handleClickAddToWishlist(item.id)
                                          }
                                        >
                                          <i class="fa-regular fa-heart"></i>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="product-content-wrap">
                                      <div className="product-name-cover">
                                        <Link
                                          to={`/product/${item.id}`}
                                          className="product-name"
                                          onClick={() =>
                                            handleClickProductDetails(item)
                                          }
                                        >
                                          {truncateText(item.name, 29)}
                                        </Link>
                                      </div>
                                      <div className="product-rate-cover">
                                        <div className="product-rate">
                                          <div className="product-rating"></div>
                                        </div>
                                      </div>
                                      <div className="product-category">
                                        <span>{item.Category.name}</span>
                                      </div>
                                      <div className="product-cart-bottom">
                                        <div className="product-price">
                                          <span>${item.price}</span>
                                        </div>
                                        <div className="product-view">
                                          <Link
                                            className="link-shop-product"
                                            to={`/product/${item.id}`}
                                            onClick={() =>
                                              handleClickProductDetails(item)
                                            }
                                          >
                                            <i class="fa-regular fa-eye"></i>
                                            Views
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            <div></div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {totalPages > 0 && (
                <div className="product-footer">
                  <ReactPaginate
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel="<<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
