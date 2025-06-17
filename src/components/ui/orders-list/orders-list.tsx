import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <ul data-cy='feed-list' className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <li key={order._id} data-cy='feed-order-card'>
        <OrderCard order={order} />
      </li>
    ))}
  </ul>
);
