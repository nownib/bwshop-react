import "./Account.scss";
import Sidebar from "./Sidebar";

const Address = () => {
  return (
    <main>
      <div className="page-content pt-100 pb-100">
        <div className="container">
          <div class="col-lg-10 m-auto">
            <div className="row">
              <div className="col-md-3">
                <Sidebar />
              </div>
              <div className="col-md-9">
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Address;
