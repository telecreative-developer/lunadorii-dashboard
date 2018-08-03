import React from "react"
import { Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"
import ImageUploader from "react-images-upload"

const AddBanner = ({
  categories,
  types,
  onChangeCategory,
  onChangeType,
  categorySelected,
  typeSelected,
  onChangeThumbnail,
  thumbnail,
  onChangeTitle,
  title
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
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </Col>
              <Col xs={6}>
                <label style={styles.label}>Title</label>
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
  label: {
    marginTop: 20
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  },
  divButton: {
    marginTop: 10,
    float: "right"
  },
  buttonSave: {
    marginLeft: 10
  }
}

export default AddBanner
