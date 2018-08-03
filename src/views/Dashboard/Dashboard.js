import React from "react"
import { Grid, Row, Col } from "react-bootstrap"
import { StatsCard } from "../../components/StatsCard/StatsCard"

const Dashboard = ({ users, products, orders, reports }) => (
  <div className="content">
    <Grid fluid>
      <Row>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-users text-warning" />}
            statsText="Users"
            statsValue={users.users_length}
            statsIconText={`${
              users.users_register_today_length
            } Register Today`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-box1 text-success" />}
            statsText="Products"
            statsValue={products.products_length}
            statsIconText={`${
              products.products_wishlisted_length
            } Whishlisted by users`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-graph1 text-danger" />}
            statsText="Transaction"
            statsValue={orders.orders_length}
            statsIconText={`${orders.orders_checkout_length} Checkout status`}
          />
        </Col>
        <Col lg={3} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-mail-open-file text-primary" />}
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
