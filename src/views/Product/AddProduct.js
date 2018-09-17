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
  discount,
  onChangeDiscount,
  thumbnails,
  onChangeThumbnail,
  onChangeDiscountCondition,
  discountCondition,
  handleAddProduct,
  loadingProduct,
  onRemoveThumbnail,
  onBack
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
                        <div className="product-banner">
                          <img
                            src={thumbnails[0].thumbnail_url}
                            alt="product-thumbnail"
                            style={{ width: "100%", maxHeight: 225 }}
                          />
                          <div className="overlay">
                            <center>
                                <p data-thumbnail-id={
                                thumbnails[0].product_thumbnail_id
                              }
                              data-thumbnail-key={thumbnails[0].key}
                              onClick={onRemoveThumbnail}>Remove</p>
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
                    <Row>
                      <Col xs={12}>
                        <div className="groupRight" style={styles.groupRight}>
                          {thumbnails.length > 1 &&
                            thumbnails
                              .filter(d => d.key !== 0)
                              .map((d, key) => (
                                <div className="product">
                                  <img
                                    className="img-dropzone"
                                    key={key}
                                    src={d.thumbnail_url}
                                    alt="product-thumbnail"
                                    style={{ width: 100, height: 100 }}
                                  />
                                  <div className="overlay">
                                    <center>
                                      <p data-thumbnail-id={
                                thumbnails[0].product_thumbnail_id
                              }
                              data-thumbnail-key={thumbnails[0].key}
                              onClick={onRemoveThumbnail}>
                                        Remove
                                      </p>
                                    </center>
                                  </div>
                                </div>
                              ))}
                          {thumbnails.length && thumbnails.length < 5 ? (
                            <Dropzone
                              className="dropzone"
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
                    disabled={loadingProduct}
                    placeholder="Title"
                  />
                  <label style={styles.label}>Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    maxLength="255"
                    onKeyUp={onChangeDescription}
                    disabled={loadingProduct}
                    placeholder="Description"
                  />

                  <label style={styles.label}>Detail</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    maxLength="255"
                    onKeyUp={onChangeDetail}
                    disabled={loadingProduct}
                    placeholder="Detail"
                  />

                  <label style={styles.label}>How to use</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    maxLength="255"
                    onKeyUp={onChangeHowToUse}
                    disabled={loadingProduct}
                    placeholder="How to use"
                  />

                  <label style={styles.label}>Price (IDR)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    onKeyUp={onChangePrice}
                    disabled={loadingProduct}
                    placeholder="Price"
                  />

                  <label style={styles.label}>Weight (gram)</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    onKeyUp={onChangeWeight}
                    disabled={loadingProduct}
                    placeholder="Weight"
                  />

                  <label style={styles.label}>Discount Percentage</label>
                  <Row>
                    <Col md={9}>
                      <input
                        type="number"
                        name="discount"
                        className="form-control"
                        disabled={
                          !JSON.parse(discountCondition) || loadingProduct
                        }
                        value={JSON.parse(discountCondition) ? discount : 0}
                        onChange={onChangeDiscount}
                        placeholder="0 %"
                      />
                    </Col>
                    <Col md={3}>
                      <div className="switch-button">
                        <label className="switch">
                          <input
                            type="checkbox"
                            disabled={loadingProduct}
                            onChange={onChangeDiscountCondition}
                            checked={JSON.parse(discountCondition)}
                          />
                          <span className="slider round" />
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <label style={styles.label}>Categories</label>
                  <select
                    className="form-control"
                    value={subcategorySelected}
                    disabled={loadingProduct}
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
                    disabled={loadingProduct}
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
                      onClick={handleAddProduct}
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

export default AddProduct
