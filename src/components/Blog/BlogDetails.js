import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Blog.scss";
import { Audio } from "react-loader-spinner";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const blogId = useSelector((state) => {
    return state.blogDetails.blogId;
  });
  const blogDetails = useSelector((state) =>
    state.blog.listBlogs.find((item) => item.id === blogId)
  );
  const isLoading = useSelector((state) => {
    return state.blog.isLoading;
  });

  useEffect(() => {
    console.log(blogDetails);
  }, []);

  return (
    <main class="main">
      <div class="page-content mb-50">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 m-auto">
              <div class="single-page pt-50 pr-30">
                <div class="single-header mb-30">
                  <div class="row">
                    <div class="col-xl-10 col-lg-12 m-auto">
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
                          <h6 class="mb-10">
                            <a className="text-1" href="#">
                              {blogDetails.category}
                            </a>
                          </h6>
                          <h2 class="mb-10 text-2">{blogDetails.title}</h2>
                          <div class="single-header-meta">
                            <div class="entry-meta meta-1 font-md mt-15 mb-15">
                              <span class="post-by">
                                By{" "}
                                <a href="#" className="text-1">
                                  {blogDetails.author}{" "}
                                </a>
                              </span>
                              <span class="text-p">- 10 months ago</span>
                            </div>
                            <div>
                              <div class="social-icons single-share cursor-pointer">
                                <span class="mr-10 icon-hover"></span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <figure class="single-thumbnail" href="#">
                    <img
                      src={blogDetails.imageUrl}
                      alt=""
                      style={{
                        maxWidth: "100%",
                        borderRadius: "15px",
                      }}
                    />
                  </figure>
                  <div className="single-content mt-50">
                    <div className="row">
                      <div className="col-xl-10 col-lg-12 m-auto">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: blogDetails.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetails;
