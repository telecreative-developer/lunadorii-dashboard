import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import Card from "../Card/Card"

const FormBanners = ({btnCancel}) => {
  return(
    <div className="contentAdd">
    <Col xs={6}>
      <Card
        title="All Banners"
        // category="Here is a subtitle for this table"
        ctTableFullWidth
        ctTableResponsive
        content={
          <form>
            <input type="text" name="title" class="form-control" maxLength="100" placeholder="Your Title"/>
            <input type="file" name="picture" style={{marginTop: 10, marginBottom: 10}}/>
            <label>Category</label>
            <select class="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <label style={{marginTop: 10}}>Type</label>
            <select class="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <div style={{marginTop: 10, float: 'right'}}>
              <button class="btn btn-warning" onClick={btnCancel}>Cancel</button>
              <button class="btn btn-info" style={{marginLeft: 10}}>Save</button>
            </div>
          </form>
        }
        />
    </Col>
  </div>
  )
}

export default FormBanners;
