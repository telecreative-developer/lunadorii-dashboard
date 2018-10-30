import React from "react"
import { Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import Card from "../../components/Card/Card"
import "../../assets/css/categoryIcons.css"

const AddCategory = ({
  categories,
  thumbnail_url,
  thumbnail,
  categoryId,
  title,
  onChangeTitle,
  onChangeCategory,
  onChangeThumbnail,
  handleAddCategory,
  loadingCategory,
  onClearImage,
  onBack
}) => (
  <div className="contentAdd">
    <Col xs={12}>
      <Card
        title="Add Category"
        ctTableFullWidth
        ctTableResponsive
        content={
          <div>
            <Row>
              <Col xs={6}>
                  {thumbnail_url ? (
                    <div className="profile">
                      <img
                        alt="category-thumbnail"
                        src={thumbnail_url}
                        style={styles.thumbnailCategory}
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
                        alt="category-thumbnail"
                        src={URL.createObjectURL(thumbnail[0])}
                        style={styles.thumbnailCategory}
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
                  <label>Name Category</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}
                    disabled={loadingCategory}
                    placeholder="Category"
                  />
              {/* <label style={styles.label}>which body part is this category <br /> (example: Head, Hand & foot, body)</label>
                  <select
                    disabled={loadingCategory}
                    value={categoryId}
                    onChange={onChangeCategory}
                    className="form-control">
                    {categories.map(categories => (
                      <option value={categories.product_category_id}>{categories.category}</option>
                    ))}
                  </select> */}
              </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {loadingCategory ? (
                  <div style={styles.divButton}>
                    <button
                      className="btn btn-default"
                      disabled={loadingCategory}
                      style={styles.btnDefault}>
                      Loading...
                    </button>
                    <button
                      className="btn btn-default"
                      disabled={loadingCategory}
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
                      disabled={thumbnail == "" || !title}
                      className="btn btn-primary"
                      onClick={handleAddCategory}
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
  thumbnailCategory: {
    width: "100%",
    maxHeight: 225
  },
  btnDefault: {
    background: "#6d6d6d",
    border: "none",
    marginRight: 10
  },
  label: {
    marginTop: 10
  },
  headerGroup: {
    marginLeft: 30
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
