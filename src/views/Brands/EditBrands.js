import React from "react"
import { Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import Card from "../../components/Card/Card"

const EditBrands = ({
 
  title,
  onChangeTitle,
  thumbnails,
  onChangeThumbnail,
  handleUpdateProduct,
  loadingProduct,
  onRemoveThumbnail,
  onBack
}) => (
  <div className="contentAdd">
    <Col xs={12}>
      <Card
        title="Edit Brands"
        ctTableFullWidth
        ctTableResponsive
        content={
          <div>
            <Row>
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <div style={styles.headerGroup}>
                      {thumbnails.length ? (
                        <div className="product-banner">
                          <img
                            src={thumbnails[0].thumbnail_url}
                            alt="product-thumbnail"
                            style={{ width: "100%", maxHeight: 225 }}
                          />
                          <div className="overlay">
                            <center>
                              <button
                                data-thumbnail-id={
                                  thumbnails[0].product_thumbnail_id
                                }
                                data-thumbnail-key={thumbnails[0].key}
                                onClick={onRemoveThumbnail}>
                                Remove
                              </button>
                            </center>
                          </div>
                        </div>
                      ) : (
                        <div className="imageUploader">
                          <Dropzone
                            style={{ width: "100%", paddingBottom: 60 }}
                            accept="image/jpeg, image/jpg, image/png"
                            onDrop={onChangeThumbnail}>
                            <p style={styles.pIconCamera}>
                              <i
                                className="pe-7s-camera"
                                style={styles.iconCamera}
                              />
                            </p>
                            <div className="group" />
                          </Dropzone>
                        </div>
                      )}
                    </div>
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
                    value={title}
                    onChange={onChangeTitle}
                    disabled={loadingProduct}
                    placeholder="Title"
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
                      onClick={handleUpdateProduct}
                      style={styles.btnSave}>
                      Update
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

export default EditBrands
