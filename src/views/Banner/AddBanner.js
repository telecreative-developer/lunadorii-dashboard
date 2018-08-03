import React from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import moment from "moment"
import Card from "../../components/Card/Card"

const AddBanner = ({
  categories,
  types,
  onChangeCategory,
  onChangeType,
  categorySelected,
  typeSelected
}) => (
  <div className="contentAdd">
    <Col xs={12}>
      <Card
        title="Add Banner"
        ctTableFullWidth
        ctTableResponsive
        content={
          <form>
            <Row>
              <Col xs={6}>
              <div class="profile">
                <img src="http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif" style={styles.imageBanners}/>
                <div class="overlay">
                  <input id="imgInp" type="file" /> 
                  <p>Change Picture</p>
                </div>
              </div>
              <label style={styles.label}>* Hover to image to change the image</label>
              </Col>
              <Col xs={6}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  name="title"
                  class="form-control"
                  maxLength="100"
                  placeholder="Your Title"
                />
                <label style={styles.label}>Category</label>
                <select class="form-control" onChange={onChangeCategory}>
                  {categories.map(category => (
                    <option
                      selected={categorySelected === category.value && "selected"}
                      value={category.value}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <label style={styles.label}>Type</label>
                <select class="form-control" onChange={onChangeType}>
                  {types.map(type => (
                    <option
                      selected={typeSelected === type.value && "selected"}
                      value={type.value}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div style={{ marginTop: 10, float: "right" }}>
                  <button class="btn btn-warning">Cancel</button>
                  <button class="btn btn-info" style={{ marginLeft: 10 }}>
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        }
      />
    </Col>
  </div>
)

const styles = {
  imageBanners:{
    width:'100%', 
    maxHeight: 400
  },
  label:{
    marginTop: 20
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  }
}

export default AddBanner
