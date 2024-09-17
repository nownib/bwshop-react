import "./Account.scss";
import { useDispatch, useSelector } from "react-redux";

const Address = () => {
  const dispatch = useDispatch();
  const listOrders = useSelector((state) => state.order.listOrders);
  return (
    <main>
      <div className="order">
        <div className="order-header">
          <h3>Your Address</h3>
        </div>
        <div className="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Street name, house number</th>
                <th>Wards</th>
                <th>District</th>
                <th>Province</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listOrders && listOrders.length > 0 ? (
                <>
                  {listOrders.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>#{index + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="btn-edit-delete">
                          <button
                            className="btn-green"
                            // onClick={() => handleViewOrderDetails(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-red"
                            // onClick={() => handleViewOrderDetails(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr></tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
export default Address;
