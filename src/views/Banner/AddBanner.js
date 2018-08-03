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
    <Col xs={6}>
      <Card
        title="Add Banner"
        ctTableFullWidth
        ctTableResponsive
        content={
          <form>
            <input
              type="text"
              name="title"
              class="form-control"
              maxLength="100"
              placeholder="Your Title"
            />
            <input type="file" name="picture" style={styles.pictureUpload} />
            <label>Category</label>
            <select class="form-control" onChange={onChangeCategory}>
              {categories.map(category => (
                <option
                  selected={categorySelected === category.value && "selected"}
                  value={category.value}>
                  {category.category}
                </option>
              ))}
            </select>
            <label style={{ marginTop: 10 }}>Type</label>
            <select class="form-control" onChange={onChangeType}>
              {types.map(type => (
                <option
                  selected={typeSelected === type.value && "selected"}
                  value={type.value}>
                  {type.type}
                </option>
              ))}
            </select>
            <div style={{ marginTop: 10, float: "right" }}>
              <button class="btn btn-warning">Cancel</button>
              <button class="btn btn-info" style={{ marginLeft: 10 }}>
                Save
              </button>
            </div>
          </form>
        }
      />
    </Col>
  </div>
)

const styles = {
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
  }
}

export default AddBanner
