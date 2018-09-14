import React from "react"
import { Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import Card from "../../components/Card/Card"

const AddCategory = ({


  handleAddProduct,
  loadingProduct,
  onBack
}) => (
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
              <div style={styles.headerGroup}>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                <Col xs={2}>
                  <img
                    className="img-dropzone"
                    src={'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png'}
                    alt="category-icons"
                    style={{ width: 100, height: 100, marginTop:10}}
                  />
                </Col>
                </div>
              </Row>
              </Col>
              <Col xs={6}>
                <div style={styles.form}>
                  <label>Name Category</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    
                    placeholder="Name Category"
                  />
              </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {loadingProduct ? (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-default"
                      disabled={loadingProduct}
                      style={styles.btnDefault}>
                      Loading...
                    </button>
                    <button
                      className="btn btn-default"
                      disabled={loadingProduct}
                      style={styles.btnDefault}>
                      Loading...
                    </button>
                  </div>
                ) : (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-warning"
                      onClick={onBack}
                      style={styles.btnCancel}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddProduct}
                      style={styles.btnSave}>
                      Save
                    </button>
                  </div>
                )}
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
  btnDefault: {
    background: "#6d6d6d",
    border: "none",
    marginRight: 10
  },
  headerGroup: {
    marginLeft: 15
  },
  groupRight: {
    marginLeft: 15,
    marginTop: 15,
    display: "inline-block"
  },
  label: {
    marginTop: 10
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  },
  pIconCamera: {
    textAlign: "center"
  },
  iconCamera: {
    fontSize: 40,
    marginTop: 60
  },
  divButton: {
    margin: 20,
    float: "right"
  },
  btnSave: {
    background: "#3279b8",
    border: "none",
    float: "right",
    marginLeft: 10,
    color: "#fff"
  },
  btnCancel: {
    background: "#ffc107",
    border: "none",
    marginLeft: 10,
    color: "#000"
  },
  form: {
    paddingRight: 20
  }
}

export default AddCategory
