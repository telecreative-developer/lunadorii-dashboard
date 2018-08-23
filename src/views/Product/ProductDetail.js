import React from "react"
import { Grid, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap"
import { convertToIDR } from "../../lib/conversion"
import Card from "../../components/Card/Card"

const tooltipClose = (
  <Tooltip id="tooltip">
    <strong>Close Product</strong>
  </Tooltip>
)

const ProductDetail = ({
  title,
  brand,
  subcategory,
  discount,
  weightGram,
  price,
  description,
  detail,
  howToUse,
  thumbnails,
  onBack
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col md={12}>
          <Card
            ctTableFullWidth
            ctTableResponsive
            content={
              <div style={styles.wrapFullMessage}>
                <OverlayTrigger placement="top" overlay={tooltipClose}>
                  <button style={styles.btnCancel} onClick={onBack}>
                    <i className="pe-7s-close-circle" />
                  </button>
                </OverlayTrigger>
                <Row>
                  <Col xs={12}>
                    <Row style={{ paddingLeft: 30 }}>
                      <Col xs={4}>
                        <img
                          src={thumbnails[0].thumbnail_url}
                          alt={thumbnails[0].thumbnail_id}
                          style={styles.imgProduct}
                        />
                        <Row style={styles.wrapSubImage}>
                          {thumbnails
                            .filter((thumbnail, key) => key !== 0)
                            .map((thumbnail, key) => (
                              <Col xs={3}>
                                <img
                                  src={thumbnail.thumbnail_url}
                                  alt={thumbnail.thumbnail_id}
                                  style={styles.imgSubProduct}
                                />
                              </Col>
                            ))}
                        </Row>
                      </Col>
                      <Col xs={7}>
                        <label>Product</label>
                        <p>
                          <b>
                            <small>{title}</small>
                          </b>
                        </p>

                        <label>Brand</label>
                        <p>
                          <small>{brand}</small>
                        </p>

                        <label>Category</label>
                        <p>
                          <small>{subcategory}</small>
                        </p>

                        <label>Wieght (Gram)</label>
                        <p style={styles.txtDiscount}>
                          <b>
                            <small>{weightGram}</small>
                          </b>
                        </p>

                        <label>Discount</label>
                        <p style={styles.txtDiscount}>
                          <b>
                            <small>{discount}%</small>
                          </b>
                        </p>

                        <label>Price</label>
                        <p>
                          <small>
                            <b>
                              {convertToIDR(price - (price * discount) / 100)}
                            </b>
                          </small>
                          <small style={styles.txtPrice}>
                            {convertToIDR(price)}
                          </small>
                        </p>

                        <label>Description</label>
                        <p>
                          <small>{description}</small>
                        </p>

                        <label>Detail</label>
                        <p>
                          <small>{detail}</small>
                        </p>

                        <label>How to use</label>
                        <p>
                          <small>{howToUse}</small>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  txtPrice: {
    textDecoration: "line-through",
    color: "#999999",
    fontsize: 12,
    marginLeft: 10
  },
  txtDiscount: {
    color: "#b18209"
  },
  wrapImage: {
    paddingLeft: 40
  },
  wrapSubImage: {
    marginTop: 10
  },
  imgProduct: {
    width: "100%",
    maxHeight: 380
  },
  imgSubProduct: {
    width: "100%",
    maxHeight: 100
  },
  btnCancel: {
    background: "transparent",
    border: "none",
    float: "right",
    marginTop: "-10px",
    marginRight: 10,
    fontSize: 25,
    color: "#000"
  }
}

export default ProductDetail
