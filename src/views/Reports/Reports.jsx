import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

class Reports extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
            <Card
              title="Reports"
              // category="Here is a subtitle for this table"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Row>
                  <Col xs={12}>
                    <Row className="wrapper-inbox">
                      <a href="#">
                        <div>
                          <Col xs={2}>
                            
                            <label style={{marginLeft: 10, fontSize: 12, fontWeight: 'bold', color:'#000'}}>Web Support Dennis</label>
                          </Col>
                          <Col xs={9}>
                            <p style={{fontWeight: 'bold', fontSize: 14, color: '#000'}}>Sveriges Hetaste sommarjobb</p>
                            <p style={{fontSize: 12, color: '#000'}}>Hej Nicklas Sandell! Vi vill bjuda in dig till "First tour 2014", ett rekryteri Hej Nicklas Sandell! Vi vill bjuda in dig till "First tour 2014", ett rekryteri..</p>
                          </Col>
                          <Col xs={1}>
                            <p style={{float: 'right', fontSize: 12, color: '#000'}}>Mar 8</p>
                          </Col>
                        </div>
                      </a>
                    </Row>
                    <Row className="wrapper-inbox-read">
                      <a href="#">
                        <div>
                          <Col xs={2}>
                            
                            <label style={{marginLeft: 10, fontSize: 12, fontWeight: 'bold', color:'#000'}}>Web Support Dennis</label>
                          </Col>
                          <Col xs={9}>
                            <p style={{fontWeight: 'bold', fontSize: 14, color: '#000'}}>Sveriges Hetaste sommarjobb</p>
                            <p style={{fontSize: 12, color: '#000'}}>Hej Nicklas Sandell! Vi vill bjuda in dig till "First tour 2014", ett rekryteri Hej Nicklas Sandell! Vi vill bjuda in dig till "First tour 2014", ett rekryteri..</p>
                          </Col>
                          <Col xs={1}>
                            <p style={{float: 'right', fontSize: 12, color: '#000'}}>Mar 8</p>
                          </Col>
                        </div>
                      </a>
                    </Row>
                  </Col>
                </Row>
              }
            />
        </Grid>
      </div>
    );
  }
}

export default Reports;
