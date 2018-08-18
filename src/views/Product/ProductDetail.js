import React from "react"
import moment from "moment"
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"

const ProductDetail = ({
  name,
  email,
  subject,
  content,
  date,
  reply,
  onSendReply,
  onChangeReplyMessage
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
                      <Col xs={4} style={styles.wrapImage}>
                        <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/3/3/136907/136907_e71f52f2-b6e5-415e-950a-2b680f0b8cf0_1080_1080.jpeg" 
                        style={styles.imgProduct}
                        />
                        <Row style={styles.wrapSubImage}>
                          <Col xs={3}>
                            <img src="http://jutanhakindonesia.com/images/Ossion-Milky-Angel-Series.jpg" 
                              style={styles.imgSubProduct}
                              />
                          </Col>
                          <Col xs={3}>
                            <img src="http://jutanhakindonesia.com/images/Ossion-Milky-Angel-Series.jpg" 
                              style={styles.imgSubProduct}
                              />
                          </Col>
                          <Col xs={3}>
                            <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/3/3/136907/136907_e71f52f2-b6e5-415e-950a-2b680f0b8cf0_1080_1080.jpeg" 
                              style={styles.imgSubProduct}
                              />
                          </Col>
                          <Col xs={3}>
                            <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2018/3/3/136907/136907_e71f52f2-b6e5-415e-950a-2b680f0b8cf0_1080_1080.jpeg" 
                              style={styles.imgSubProduct}
                              />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={7}>
                        <label>Product</label>
                        <p><b><small>100 Ml Kangen Water Strong Acid PH 2,5 Untuk Jerawat</small></b></p>
                      
                        <label>Brand</label>
                        <p><small>Zara</small></p>

                        <label>Category</label>
                        <p><small>Face</small></p>

                        <label>Discount</label>
                        <p style={styles.txtDiscount}><b><small>10%</small></b></p>

                        <label>Price</label>
                        <p><small><b>Rp 900</b></small> <small style={styles.txtPrice}>Rp 1000</small></p>
                        
                        <label>Description</label>
                        <p>
                          <small>
                            STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                            STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                            STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                          </small>
                        </p>

                        <label>Detail</label>
                      <p>
                        <small>
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                        </small>
                      </p>

                      <label>How to use</label>
                      <p>
                        <small>
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                          STRONG ACIDIC PH 2.5 (BUKAN UNTUK DIMINUM) Dengan PH 2.5 Jenis air in berguna sebagai antiseptik, pembunuh kuman dan bakteri.
                        </small>
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
  txtPrice:{
    textDecoration:'line-through',
    color: '#999999', 
    fontsize: 12
  },
  txtDiscount:{
    color: '#b18209'
  },
  wrapImage:{
    paddingLeft: 40
  },
  wrapSubImage:{
    marginTop: 10
  },
  imgProduct:{
    width: '100%', 
    maxHeight: 380
  },
  imgSubProduct:{
    width: '100%', 
    maxHeight: 100
  }
}

export default ProductDetail
