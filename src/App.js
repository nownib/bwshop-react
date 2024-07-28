import "./App.scss";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import NavHeader from "./components/Navigation/NavHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      {/* 1 */}
      <BrowserRouter>
        <div className="app-header">
          <NavHeader />
        </div>
        {user && user.isLoading ? (
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
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
