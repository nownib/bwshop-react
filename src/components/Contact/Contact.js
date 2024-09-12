import "./Contact.scss";
import contact1 from "../../assets/images/contact-1.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendContact } from "../../services/contactService";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = async () => {
    let response = await sendContact(name, phone, email, subject, message);
    console.log(response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
    }
  };
  return (
    <main>
      <div className="page-content pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="row align-items-end mb-50">
                <div className="col-lg-4 mb-lg-0 mb-md-5 mb-3">
                  <h4 className="mb-20 text-brand">How can help you ?</h4>
                  <h1 class="mb-30 text-title">
                    Let us know how we can help you
                  </h1>
                  <p class="mb-20 text-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </p>
                  <p className="text-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </p>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div class="col-lg-6 mb-3">
                      <h5 class="mb-20 text-1">01. Visit Feedback</h5>
                      <p className="text-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo.
                      </p>
                    </div>
                    <div class="col-lg-6 mb-3">
                      <h5 class="mb-20 text-1">02. Employer Services</h5>
                      <p className="text-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo.
                      </p>
                    </div>
                    <div class="col-lg-6 mb-lg-0 mb-3">
                      <h5 class="mb-20 text-1">03. Billing Inquiries</h5>
                      <p className="text-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo.
                      </p>
                    </div>
                    <div class="col-lg-6">
                      <h5 class="mb-20 text-1">04.General Inquiries</h5>
                      <p className="text-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-12 m-auto">
              <section className="mb-50">
                <div className="row">
                  <div className="col-xl-8">
                    <div className="contact-from-area">
                      <h5 class="text-brand mb-10">Contact form</h5>
                      <h2 class="mb-10 text-title">Drop Us a Line</h2>
                      <p class="text-p mb-30">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <div className="body-form mt-30">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                name="name"
                                class="px-3"
                                placeholder="Name"
                                value={name}
                                onChange={(event) =>
                                  setName(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                name="email"
                                class="px-3"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                name="phone"
                                class="px-3"
                                placeholder="Phone"
                                value={phone}
                                onChange={(event) =>
                                  setPhone(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                name="subject"
                                class="px-3"
                                placeholder="Subject"
                                value={subject}
                                onChange={(event) =>
                                  setSubject(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <div class="mb-30">
                                <textarea
                                  name="message"
                                  placeholder="Message"
                                  value={message}
                                  onChange={(event) =>
                                    setMessage(event.target.value)
                                  }
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div>
                            <button
                              class="btn btn-submit"
                              type="submit"
                              onClick={() => handleContact()}
                            >
                              Send message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 pl-50 d-lg-block d-none">
                    <img
                      class="mt-50"
                      src={contact1}
                      alt=""
                      style={{ maxWidth: "100%", borderRadius: "15px" }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
