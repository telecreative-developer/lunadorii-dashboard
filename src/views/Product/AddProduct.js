import React from "react"
import { Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"

const AddProduct = ({ addProduct }) => (
  <div className="contentAdd">
    <Col xs={12}>
      <Card
        title="Add Products"
        ctTableFullWidth
        ctTableResponsive
        content={
          <div>
            <Row>
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div style={styles.headerGroup}>
                      <div className='group'>
                        <div id='groupcrop'>
                          <div className='VPcrop'>
                            <input className='VPcropint' id='VPcropint' name='input'type='file' accept="image/x-png, image/gif, image/jpeg"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Row>
                      <Col xs={3}>
                        <div className='groupRight' style={styles.groupRight}>
                          <div id='groupcropRight'>
                            <div className='VPcropRight'>
                              <input className='VPcropintRight' id='VPcropintRight' name='input'type='file' accept="image/x-png, image/gif, image/jpeg"/>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className='groupRight' style={styles.groupRight}>
                          <div id='groupcropRight'>
                            <div className='VPcropRight'>
                              <input className='VPcropintRight' id='VPcropintRight' name='input'type='file' accept="image/x-png, image/gif, image/jpeg"/>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className='groupRight' style={styles.groupRight}>
                          <div id='groupcropRight'>
                            <div className='VPcropRight'>
                              <input className='VPcropintRight' id='VPcropintRight' name='input'type='file' accept="image/x-png, image/gif, image/jpeg"/>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className='groupRight' style={styles.groupRight}>
                          <div id='groupcropRight'>
                            <div className='VPcropRight'>
                              <input className='VPcropintRight' id='VPcropintRight' name='input'type='file' accept="image/x-png, image/gif, image/jpeg"/>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <div style={styles.form}>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Your Title"
                  />
                  <label style={styles.label}>Description</label>
                  <textarea class="form-control" rows="5" required="ON" maxlength="255" placeholder="Description"></textarea>
                  
                  <label style={styles.label}>Detail</label>
                  <textarea class="form-control" rows="5" required="ON" maxlength="255" placeholder="Detail"></textarea>
                  
                  <label style={styles.label}>How to use</label>
                  <textarea class="form-control" rows="5" required="ON" maxlength="255" placeholder="How to use"></textarea>
                  
                  <label style={styles.label}>Discount Percentage</label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    placeholder="Your Discount"
                  />

                  <label style={styles.label}>Categories</label>
                  <select class="form-control">
                    <option value="volvo">Face</option>
                    <option value="saab">Cream</option>
                  </select>

                  <label style={styles.label}>Brands</label>
                  <select class="form-control">
                    <option value="volvo">Zara</option>
                    <option value="saab">Garnier</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div style={styles.divButton}>
                  <button className="btn btn-warning">Cancel</button>
                  <button className="btn btn-info" style={styles.buttonSave}>
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        }
      />
    </Col>
  </div>
)

const styles = {
  imageBanners: {
    width: "100%",
    maxHeight: 400
  },
  headerGroup:{
    marginLeft: 15
  },
  groupRight:{
    marginLeft: 15, marginTop: 15
  },
  label: {
    marginTop: 10
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  },
  divButton: {
    margin: 20,
    float: "right"
  },
  buttonSave: {
    marginLeft: 10
  },
  form:{
    paddingRight: 20
  }
}

export default AddProduct
