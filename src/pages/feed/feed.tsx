import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, useSelector } from '../../services/store';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../../services/slices/feed';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredients';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchBurgerIngredients());
  }, []);
  const orders: TOrder[] = useSelector(
    state => state.feeds.feeds?.orders || []
  );

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
