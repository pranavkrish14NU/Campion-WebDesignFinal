import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { faqdata } from "./Faqdata";
import { Container, Row, Col } from "react-bootstrap";
import '../../dist/FaqPage.css';

function FaqPage() {
  const splitData = () => {
    const length = faqdata.length;
    const middleIndex = Math.floor(length / 2);

    if (length % 2 === 0) {
      // If the length is even, split into two equal halves
      const firstHalf = faqdata.slice(0, middleIndex);
      const secondHalf = faqdata.slice(middleIndex);
      return [firstHalf, secondHalf];
    } else {
      // If the length is odd, give the first half one more element
      const firstHalf = faqdata.slice(0, middleIndex + 1);
      const secondHalf = faqdata.slice(middleIndex + 1);
      return [firstHalf, secondHalf];
    }
  };

  const [firstHalf, secondHalf] = splitData();
  //   console.log(typeof(firstHalf));
  //   console.log(typeof(faqdata));
  return (
    <Container className="faq-container">
      <Row className="faq-header mb-3 mt-3">
        <Col lg="8">
          <h3 className="display-6 mb-4">Frequently Asked Questions</h3>
          {/* <hr className="t_border my-4 ml-0 text-left" /> */}
        </Col>
      </Row>
      <Row className="faq-data">
        <Col lg="5" className="mb-5">
          <Accordion>
            {firstHalf.map((item, index) => (
              <Accordion.Item eventKey={`faq-${index}`}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col lg="5" className="mb-5">
          <Accordion>
            {secondHalf.map((item, index) => (
              <Accordion.Item eventKey={`faq-${index}`}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default FaqPage;
