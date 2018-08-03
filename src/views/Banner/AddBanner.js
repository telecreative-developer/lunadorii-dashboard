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
                {/* <div className="imageUploader">
                  <p style={{textAlign: 'center'}}><i class="pe-7s-camera" style={{fontSize: 40, marginTop: 20}}></i></p>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Choose images"
                    label="Max Image size 5 Mb, Accepted .jpg, .gif, .png"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png"]}
                    maxFileSize={5242880}
                    style={{marginTop: 0}}
                  />
                </div> */}
                <div class="profile">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Facebook_New_Logo_%282015%29.svg/2000px-Facebook_New_Logo_%282015%29.svg.png" style={{width: '100%', maxHeight: 225}}/>
                  <div class="overlay">
                    <center><p>Cancel</p></center>
                  </div>
                </div>
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
    margin: 20,
    float: "right"
  },
  buttonSave: {
    marginLeft: 10
  },
  form:{
    padding: 20
  }
}

export default AddBanner
