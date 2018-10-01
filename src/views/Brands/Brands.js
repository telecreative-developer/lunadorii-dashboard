import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { convertToIDR } from "../../lib/conversion"

const tableHead = [
  "No",
  "Picture",
  "Brand",
  "Action"
]

const tooltipRemove = (
  <Tooltip id="tooltip">
    <strong>Remove</strong>
  </Tooltip>
)

const tooltipEdit = (
  <Tooltip id="tooltip">
    <strong>Edit</strong>
  </Tooltip>
)

const Brand = ({
  brands,
  onUpdateBrand,
  onAddBrand,
  onDeleteBrand,
  loadingDeleteBrand,
  searchByTitle,
  onChangeSearch
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button
            className="btn btn-primary"
            onClick={onAddBrand}
            style={styles.btnAdd}>
            Add Brands
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            title="All brands"
            search={
              <form>
                <FormControl
                  type="text"
                  placeholder="Search By Brand"
                  value={searchByTitle}
                  onChange={onChangeSearch}
                />
              </form>
            }
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead>
                  <tr>
                    {tableHead.map((head, key) => <th key={key}>{head}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {brands.filter(brands => brands.brand.toLowerCase().indexOf(searchByTitle) > -1 ).map((brand, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <img
                          alt="brand-thumbnail"
                          src={brand.logo_url}
                          style={{ width: 100 }}
                        />
                      </td>
                      <td>{brand.brand}</td>
                      <td>
                        
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button
                            data-brand-id={brand.product_brand_id}
                            data-brand-title={brand.brand}
                            data-brand-thumbnail={brand.logo_url}
                            onClick={onUpdateBrand}
                            className="btn btn-info"
                            style={styles.btnEdit}>
                            <i
                              data-brand-id={brand.product_brand_id}
                              data-brand-title={brand.brand}
                              data-brand-thumbnail={brand.logo_url}
                              className="pe-7s-eyedropper"
                              style={{ color: "#fff" }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipRemove}>
                          {loadingDeleteBrand ? (
                            <button
                              className="btn btn-default"
                              style={styles.btnDefault}>
                              <i
                                className="pe-7s-trash"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          ) : (
                            <button
                              data-brand-id={brand.product_brand_id}
                              className="btn btn-default"
                              onClick={onDeleteBrand}
                              style={styles.btnDefault}>
                              <i
                                data-brand-id={brand.product_brand_id}
                                className="pe-7s-trash"
                                style={{ color: "#fff" }}
                              />
                            </button>
                          )}
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

const styles = {
  btnAdd: {
    background: "#3279b8",
    border: "none",
    float: "right",
    marginBottom: 10,
    color: "#fff"
  },
  btnShow: {
    background: "#3279b8",
    border: "none",
    color: "#fff",
    marginRight: 10
  },
  btnEdit: {
    background: "#59c1de",
    border: "none",
    marginRight: 10
  },
  btnDefault: {
    background: "#6d6d6d",
    border: "none",
    marginRight: 10
  }
}

export default Brand
