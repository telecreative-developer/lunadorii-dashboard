import React from "react"
import { Grid, Row, Col } from "react-bootstrap"
import { StatsCard } from "../../components/StatsCard/StatsCard"

const Dashboard = ({ users, products, orders, reports }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-id text-warning" />}
            statsText="Users"
            statsValue={users.users_length}
            statsIconText={`${
              users.users_register_today_length
            } Register Today`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-box2 text-danger" />}
            statsText="Products"
            statsValue={products.products_length}
            statsIconText={`${
              products.products_wishlisted_length
            } Whishlisted by users`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-credit text-success" />}
            statsText="Transaction"
            statsValue={orders.orders_length}
            statsIconText={`${orders.orders_checkout_length} Checkout status`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-note2 text-info" />}
            statsText="Reports"
            statsValue={reports.reports_length}
            statsIconText={`${reports.reports_not_read_length} Reports unread`}
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

export default Dashboard
