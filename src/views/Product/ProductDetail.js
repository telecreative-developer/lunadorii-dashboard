import React from "react"
import { Grid, Row, Col } from "react-bootstrap"
import { convertToIDR } from "../../lib/conversion"
import Card from "../../components/Card/Card"

const ProductDetail = ({
  title,
  brand,
  subcategory,
  discount,
  price,
  description,
  detail,
  howToUse,
  thumbnails
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
                <Row>
                  <Col xs={12}>
                    <Row>
                      <Col xs={4}>
                        <img
                          src={thumbnails[0].thumbnail_url}
                          style={{ width: "100%", maxHeight: 380 }}
                        />
                        <Row style={{ marginTop: 10 }}>
                          {thumbnails
                            .filter((thumbnail, key) => key !== 0)
                            .map((thumbnail, key) => (
                              <Col xs={3}>
                                <img
                                  src={thumbnail.thumbnail}
                                  style={{ width: "100%", maxHeight: 150 }}
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
    fontsize: 12
  },
  txtDiscount: {
    color: "#b18209"
  }
}

export default ProductDetail