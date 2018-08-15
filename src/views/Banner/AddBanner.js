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
  submitType
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
                      onDrop={onChangeThumbnail}>
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
                <div style={styles.divButton}>
                  <button className="btn btn-warning" onClick={handleCancel}>
                    Cancel
                  </button>
                  {submitType === "add-banner" ? (
                    <button
                      className="btn btn-info"
                      style={styles.buttonSave}
                      onClick={handleAddBanner}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-info"
                      style={styles.buttonSave}
                      onClick={handleUpdateBanner}>
                      Update
                    </button>
                  )}
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
  buttonSave: {
    marginLeft: 10
  },
  pIconCamera: {
    textAlign: "center"
  },
  iconCamera: {
    fontSize: 40,
    marginTop: 20
  },
  imageUploader: {
    marginTop: 0
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
