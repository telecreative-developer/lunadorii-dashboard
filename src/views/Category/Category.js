import React from "react"
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, FormControl } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { convertToIDR } from "../../lib/conversion"

const tableHead = [
  "No",
  "Name",
  "Icon",
  // "Body Part"
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

const Category = ({
  categories,
  subcategories,
  onUpdateSubcategory,
  onAddSubcategory,
  onDeleteSubcategory,
  loadingDeleteSubcategory,
  searchByTitle,
  onChangeSearch
}) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <button
            className="btn btn-primary"
            onClick={onAddSubcategory}
            style={styles.btnAdd}>
            Add Category
          </button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            title="All Category"
            search={
              <form>
                <FormControl
                  type="text"
                  placeholder="Search By Category"
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
                  {subcategories.filter(subcategories => subcategories.subcategory.toLowerCase().indexOf(searchByTitle) > -1 ).map((subcategory, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{subcategory.subcategory}</td>
                      <td>
                        <img
                          alt="category-thumbnail"
                          src={subcategory.thumbnail_url}
                          style={{ width: 100 }}
                        />
                      </td>
                      
                      {/* <td>{categories.filter(category => category.product_category_id === subcategory.product_category_id).map(d => d.category)}</td> */}
                      <td>
                        
                        <OverlayTrigger placement="top" overlay={tooltipEdit}>
                          <button
                            data-subcategory-id={subcategory.product_subcategory_id}
                            data-subcategory-CategoryId={subcategory.product_category_id}
                            data-subcategory-title={subcategory.subcategory}
                            data-subcategory-thumbnail={subcategory.thumbnail_url}
                            onClick={onUpdateSubcategory}
                            className="btn btn-info"
                            style={styles.btnEdit}>
                            <i
                              data-subcategory-id={subcategory.product_subcategory_id}
                              data-subcategory-CategoryId={subcategory.product_category_id}
                              data-subcategory-title={subcategory.subcategory}
                              data-subcategory-thumbnail={subcategory.thumbnail_url}
                              className="pe-7s-eyedropper"
                              style={{ color: "#fff" }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={tooltipRemove}>
                          {loadingDeleteSubcategory ? (
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
                            data-subcategory-id={subcategory.product_subcategory_id}
                              className="btn btn-default"
                              onClick={onDeleteSubcategory}
                              style={styles.btnDefault}>
                              <i
                                data-subcategory-id={subcategory.product_subcategory_id}
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

export default Category
