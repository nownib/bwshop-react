import "./Blog.scss";
import category from "../../assets/icons/category-1.svg";
import { Link } from "react-router-dom";
import {
  fetchAllBlogsRedux,
  fetchBlogDetailsRedux,
} from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";

const Blog = () => {
  const dispatch = useDispatch();
  const listBlogs = useSelector((state) => state.blog.listBlogs);
  const isLoading = useSelector((state) => {
    return state.blog.isLoading;
  });
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const handleClickBlogDetails = (blog) => {
    let blogId = blog.id;
    dispatch(fetchBlogDetailsRedux(blogId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(fetchAllBlogsRedux());
    console.log(listBlogs);
  }, [dispatch]);
  return (
    <main>
      <div className="blog-content mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div class="shop-product-fillter mb-50">
                <div class="totall-product">
                  <h1 className="text-title">
                    <img
                      class=" mr-10"
                      src={category}
                      alt=""
                      style={{
                        maxWidth: "36px",
                      }}
                    />
                    Blog
                  </h1>
                </div>
              </div>
              <div className="loop-grid">
                <div className="row">
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
                      {listBlogs && listBlogs.length > 0 ? (
                        listBlogs.map((item, index) => {
                          return (
                            <>
                              <article
                                class="col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30"
                                style={{ minHeight: "350px" }}
                              >
                                <div class="post-thumb">
                                  <Link
                                    to={`/blog/${item.id}`}
                                    onClick={() => handleClickBlogDetails(item)}
                                  >
                                    <img
                                      class="border-radius-15"
                                      src={item.imageUrl}
                                      alt=""
                                      style={{
                                        maxHeight: "160px",
                                        minWidth: "200px",
                                        objectFit: "cover",
                                        borderRadius: "15px",
                                      }}
                                    />
                                  </Link>
                                </div>
                                <div class="entry-content-2">
                                  <h6 class="mb-10 font-sm">
                                    <Link
                                      to={`/blog/${item.id}`}
                                      class="text-muted"
                                      onClick={() =>
                                        handleClickBlogDetails(item)
                                      }
                                    >
                                      {item.category}
                                    </Link>
                                  </h6>
                                  <h4 class="post-title mb-15">
                                    <Link
                                      to={`/blog/${item.id}`}
                                      onClick={() =>
                                        handleClickBlogDetails(item)
                                      }
                                    >
                                      {truncateText(item.title, 29)}
                                    </Link>
                                  </h4>
                                  <div class="entry-meta font-xs color-grey mt-10 pb-10">
                                    <div>
                                      <span class="post-on mr-10">
                                        10 months ago by: {item.author}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </>
                          );
                        })
                      ) : (
                        <>
                          <div></div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
