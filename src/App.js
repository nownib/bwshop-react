import "./App.scss";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import NavHeader from "./components/Navigation/NavHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import { useEffect } from "react";
import { fetchUserRedux } from "./redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });
  useEffect(() => {
    dispatch(fetchUserRedux());
  }, [dispatch]);
  return (
    <>
      {/* 1 */}
      <BrowserRouter>
        <div className="app-header">
          <NavHeader />
        </div>
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
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}
        <div className="app-footer">
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
