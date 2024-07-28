import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserAccount();

    if (response && response.EC === 0) {
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.token;

      let data = {
        isAuthenticated: true,
        token: token,
        account: { email, username },
        isLoading: false,
      };
      setUser(data);
      //data sẽ không được set ngay lập tức, và việc bị mất thông tin lại diễn ra, cần loading page
    } else {
      setUser({ ...userDefault, isLoading: true });
    }
  };
  useEffect(() => {
    fetchUser();
    //reload sẽ lấy lại dữ liệu người dùng (giống như lúc đăng nhập), nếu không sẽ mất data người dùng
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
