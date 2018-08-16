import React from "react"
import { Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"
import Dropzone from "react-dropzone"

const AddBanner = ({
  categories,
  types,
  onChangeCategory,
  onChangeType,
  categorySelected,
  typeSelected,
  onChangeThumbnail,
  thumbnail,
  thumbnailUrl,
  onChangeTitle,
  title,
  formType,
  handleAddBanner,
  handleUpdateBanner,
  onClearImage,
  handleCancel,
  submitType,
  loadingBanner
}) => (
  <div className="contentAdd">
    <Col xs={12}>
      <Card
        title="Add Banner"
        ctTableFullWidth
        ctTableResponsive
        content={
          <div>
            <Row>
              <Col xs={6}>
                {thumbnailUrl ? (
                  <div className="profile">
                    <img
                      alt="banner-thumbnail"
                      src={thumbnailUrl}
                      style={styles.thumbnailBanner}
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
                      alt="banner-thumbnail"
                      src={URL.createObjectURL(thumbnail[0])}
                      style={styles.thumbnailBanner}
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
                    maxLength="100"
                    value={title}
                    onChange={onChangeTitle}
                    placeholder="Your Title"
                  />
                  <label style={styles.label}>Category</label>
                  <select
                    className="form-control"
                    value={categorySelected}
                    onChange={onChangeCategory}>
                    {categories.map((category, key) => (
                      <option key={key} value={category.value}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  <label style={styles.label}>Type</label>
                  <select
                    className="form-control"
                    value={typeSelected}
                    onChange={onChangeType}>
                    {types.map((type, key) => (
                      <option key={key} value={type.value}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {loadingBanner ? (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-default"
                      style={styles.btnDefault}>
                      Cancel
                    </button>
                    {submitType === "add-banner" ? (
                      <button
                        className="btn btn-default"
                        style={styles.btnDefault}
                        onClick={handleAddBanner}>
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-default"
                        style={styles.btnDefault}
                        onClick={handleUpdateBanner}>
                        Update
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-warning"
                      onClick={handleCancel}
                      style={styles.btnCancel}>
                      Cancel
                    </button>
                    {submitType === "add-banner" ? (
                      <button
                        className="btn btn-primary"
                        style={styles.btnSave}
                        onClick={handleAddBanner}>
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        style={styles.btnSave}
                        onClick={handleUpdateBanner}>
                        Update
                      </button>
                    )}
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
  label: {
    marginTop: 20
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  },
  divButton: {
    margin: 20,
    float: "right"
  },
  btnDefault: {
    background: "#6d6d6d",
    border: "none",
    marginRight: 10
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
  pIconCamera: {
    textAlign: "center"
  },
  iconCamera: {
    fontSize: 40,
    marginTop: 60
  },
  imageUploader: {
    marginTop: 0,
    width: "100%"
  },
  thumbnailBanner: {
    width: "100%",
    maxHeight: 225
  },
  form: {
    paddingRight: 20
  }
}

export default AddBanner
