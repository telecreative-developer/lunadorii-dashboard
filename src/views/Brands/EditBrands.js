import React from "react"
import { Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import Card from "../../components/Card/Card"

const EditBrands = ({
  title,
  onChangeTitle,
  logo_url,
  thumbnail,
  onChangeThumbnail,
  onClearImage,
  handleUpdateBrand,
  loadingBrand,
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
                {logo_url ? (
                  <div className="profile">
                    <img
                      alt="brand-thumbnail"
                      src={logo_url}
                      style={styles.thumbnailBrand}
                    />
                    <div className="overlay" onClick={onClearImage}>
                      <center>
                        <p>Remove</p>
                      </center>
                    </div>
                  </div>
                ) : thumbnail.length ? (
                  <div className="profile">
                    <img
                      alt="brand-thumbnail"
                      src={URL.createObjectURL(thumbnail[0])}
                      style={styles.thumbnailBrand}
                    />
                    <div className="overlay" onClick={onClearImage}>
                      <center>
                        <p>Remove</p>
                      </center>
                    </div>
                  </div>
                ) : (
                  <div className="imageUploader">
                    <Dropzone
                      accept="image/jpeg, image/jpg, image/png"
                      onDrop={onChangeThumbnail}
                      style={{ width: "100%", paddingBottom: 60 }}>
                      <p style={styles.pIconCamera}>
                        <i className="pe-7s-camera" style={styles.iconCamera} />
                      </p>
                    </Dropzone>
                  </div>
                )}
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
                    disabled={loadingBrand}
                    placeholder="Title"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {loadingBrand ? (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-default"
                      disabled={loadingBrand}
                      style={styles.btnDefault}>
                      Loading...
                    </button>
                    <button
                      className="btn btn-default"
                      disabled={loadingBrand}
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
                      disabled={!thumbnail || !title}
                      className="btn btn-primary"
                      onClick={handleUpdateBrand}
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
  imageBrands: {
    width: "100%",
    maxHeight: 400
  },
  thumbnailBrand: {
    width: "100%",
    maxHeight: 225
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
