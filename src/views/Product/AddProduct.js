import React from "react"
import { Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import Card from "../../components/Card/Card"

const AddProduct = ({
  subcategories,
  subcategorySelected,
  onChangeSubcategory,
  brands,
  brandSelected,
  onChangeBrand,
  onChangeTitle,
  onChangeDescription,
  onChangeDetail,
  onChangeHowToUse,
  onChangePrice,
  onChangeWeight,
  onChangeDiscount,
  thumbnails,
  onChangeThumbnail,
  handleAddProduct
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
                  <Col xs={12}>
                    <div style={styles.headerGroup}>
                      {thumbnails.length ? (
                        <img
                          src={thumbnails[0].thumbnail_url}
                          alt="product-thumbnail"
                          style={{ width: 500, height: 300 }}
                        />
                      ) : (
                        <Dropzone
                          accept="image/jpeg, image/jpg, image/png"
                          onDrop={onChangeThumbnail}>
                          <div className="group" />
                        </Dropzone>
                      )}
                    </div>
                    <Row>
                      <Col xs={3}>
                        <div className="groupRight" style={styles.groupRight}>
                          {thumbnails.length > 1 &&
                            thumbnails
                              .filter(d => d.key !== 0)
                              .map((d, key) => (
                                <img
                                  key={key}
                                  src={d.thumbnail_url}
                                  alt="product-thumbnail"
                                  style={{ width: 100, height: 100 }}
                                />
                              ))}
                          {thumbnails.length && thumbnails.length < 5 ? (
                            <Dropzone
                              accept="image/jpeg, image/jpg, image/png"
                              onDrop={onChangeThumbnail}>
                              <div className="group" />
                            </Dropzone>
                          ) : (
                            <div />
                          )}
                        </div>
                      </Col>
                    </Row>
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
                    onKeyUp={onChangeTitle}
                    placeholder="Title"
                  />
                  <label style={styles.label}>Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    required="ON"
                    maxLength="255"
                    onKeyUp={onChangeDescription}
                    placeholder="Description"
                  />

                  <label style={styles.label}>Detail</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    required="ON"
                    maxLength="255"
                    onKeyUp={onChangeDetail}
                    placeholder="Detail"
                  />

                  <label style={styles.label}>How to use</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    required="ON"
                    maxLength="255"
                    onKeyUp={onChangeHowToUse}
                    placeholder="How to use"
                  />

                  <label style={styles.label}>Price (IDR)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    onKeyUp={onChangePrice}
                    placeholder="Price"
                  />

                  <label style={styles.label}>Weight (gram)</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    onKeyUp={onChangeWeight}
                    placeholder="Weight"
                  />

                  <label style={styles.label}>Discount Percentage</label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    onKeyUp={onChangeDiscount}
                    placeholder="Your Discount"
                  />

                  <label style={styles.label}>Categories</label>
                  <select
                    className="form-control"
                    value={subcategorySelected}
                    onChange={onChangeSubcategory}>
                    {subcategories.map((subcategory, key) => (
                      <option
                        key={key}
                        value={subcategory.product_subcategory_id}>
                        {subcategory.subcategory}
                      </option>
                    ))}
                  </select>
                  <label style={styles.label}>Brands</label>
                  <select
                    className="form-control"
                    value={brandSelected}
                    onChange={onChangeBrand}>
                    {brands.map((brand, key) => (
                      <option key={key} value={brand.product_brand_id}>
                        {brand.brand}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div style={styles.divButton}>
                  <button className="btn btn-warning" style={styles.btnCancel}>Cancel</button>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddProduct}
                    style={styles.btnSave}>
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
  headerGroup: {
    marginLeft: 15
  },
  groupRight: {
    marginLeft: 15,
    marginTop: 15
  },
  label: {
    marginTop: 10
  },
  pictureUpload: {
    marginTop: 10,
    marginBottom: 10
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

export default AddProduct
