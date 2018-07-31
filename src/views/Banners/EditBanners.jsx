import React, { Component } from "react"
import { Grid, Row, Col, Table } from "react-bootstrap"
import Card from "components/Card/Card.jsx"

class EditBanners extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="All Banners"
                // category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Banner</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Active</th>
                        <th>Action</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td><img src="https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=P4xvtG%2FeyE4DSG%2F882tkfuYpCn4%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6nlh8Tw1It6a2FowGz60oISIfYC2G8G2f1spyfNT-tdoDSeLChpEtOdSoCkBJkcrG-GGGiSp71T-PuN755_NWWdZO9dFcjegVgrWpa_vMBISBh5rDgCvnxPX8LgM9ZSw2eB4HtbGAyGgIbr-CfHLL-C20gnASvVfnXDc0QWfoywtcP1FJgnpzdF81p48FY2k1dhQvs9JLZOS4-ysetW2iaFUwlXknWFfVLrJWI4ROjhUbI1234loqKL6vzNYk" style={{width: 100}}/></td>
                        <td>Diskon 50%</td>
                        <td>General</td>
                        <td>General</td>
                        <td>Active</td>
                        <td>
                          <button class="btn btn-warning" style={{marginLeft: 10, marginRight: 10}}>Edit</button>
                          <button class="btn btn-danger">Unactive</button>
                        </td>
                        <td>
                          <button style={{background: 'transparent', border:'none', padding: 10}}>
                            <i className="pe-7s-trash" style={{fontSize: 18}}/>
                          </button>  
                        </td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td><img src="https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=P4xvtG%2FeyE4DSG%2F882tkfuYpCn4%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6nlh8Tw1It6a2FowGz60oISIfYC2G8G2f1spyfNT-tdoDSeLChpEtOdSoCkBJkcrG-GGGiSp71T-PuN755_NWWdZO9dFcjegVgrWpa_vMBISBh5rDgCvnxPX8LgM9ZSw2eB4HtbGAyGgIbr-CfHLL-C20gnASvVfnXDc0QWfoywtcP1FJgnpzdF81p48FY2k1dhQvs9JLZOS4-ysetW2iaFUwlXknWFfVLrJWI4ROjhUbI1234loqKL6vzNYk" style={{width: 100}}/></td>
                        <td>Diskon 50%</td>
                        <td>General</td>
                        <td>General</td>
                        <td>Unactive</td>
                        <td>
                          <button class="btn btn-warning" style={{marginLeft: 10, marginRight: 10}}>Edit</button>
                          <button class="btn btn-primary">Active</button>
                        </td>
                        <td>
                          <button style={{background: 'transparent', border:'none', padding: 10}}>
                            <i className="pe-7s-trash" style={{fontSize: 18}}/>
                          </button>  
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditBanners;