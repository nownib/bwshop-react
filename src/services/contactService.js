import axios from "../setup/axios";

const sendContact = (name, phone, email, subject, message) => {
  return axios.post("/api/contact/add", {
    name,
    phone,
    email,
    subject,
    message,
  });
};

export { sendContact };
