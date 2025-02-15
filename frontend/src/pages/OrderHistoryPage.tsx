import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useGetOrderHistoryQuery } from '../hooks/orderHooks';
import { getError } from '../utils';

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: orders, isPending, error } = useGetOrderHistoryQuery();

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {isPending ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{getError(error)}</MessageBox>
      ) : orders && orders.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                </td>
                <td>{order.totalPrice?.toFixed(2) ?? '0.00'}</td>
                <td>
                  {order.isPaid
                    ? order.paidAt
                      ? order.paidAt.substring(0, 10)
                      : 'N/A'
                    : 'No'}
                </td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt
                      ? order.deliveredAt.substring(0, 10)
                      : 'N/A'
                    : 'No'}
                </td>
                <td>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <MessageBox variant='info'>No orders found.</MessageBox>
      )}
    </div>
  );
};

export default OrderHistoryPage;
