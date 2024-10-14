import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import "../../dist/ContactUs.css";

export const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if(form.current){
      emailjs
        .sendForm(
          "service_z6wt5ne",//Service ID
          "template_rueqmne", //Template ID
          form.current,
          "3W7cPy7Rb7IvtlfG-" // Public Key
        )
        .then(
          (result) => {
            // console.log(result.text);
            console.log('Mail sent');
            (e.target as HTMLFormElement).reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
      }
  };

  return (
    <>
      <Container className="contact-container">
        <Row className="mb-3 mt-3">
          <Col lg="8">
            <h3 className="display-6 mb-4">Contact Us</h3>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:xyz@gmail.com`}>{"xyz@gmail.com"}</a>
              <br />
              <br />
              <p>
                <strong>Phone:</strong> +91 6234575851
              </p>
            </address>
            <p>
            Welcome to our campsite, where adventure meets tranquility in the heart of nature. Our friendly staff is here to assist you with any questions or special requests you may have. Feel free to reach out to us via the contact form, email, or phone number provided above. We look forward to helping you plan your next outdoor adventure!

            Thank you for considering Campion as your destination for camping and outdoor activities. We can't wait to welcome you to our campfire under the stars!
            </p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact__form w-100"
            >
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="user_name"
                    placeholder="Your Name"
                    type="text"
                    required
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="user_email"
                    placeholder="Your Email"
                    type="email"
                    required
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Enter the Message here..."
                rows={5}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" value="Send">
                    Send
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactUs;
