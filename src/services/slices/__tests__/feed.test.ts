import { feed, fetchOrders } from '../feed';
import { TFeedsResponse } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api', () => ({
  getFeedsApi: jest.fn(),
}));

describe('feed reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('handles pending', () => {
    const initialState = feed.getInitialState();
    const action = fetchOrders.pending('requestId');
    const state = feed.reducer(initialState, action);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const feeds: TFeedsResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['main ingredient', 'secondary ingredient'],
          status: 'done',
          name: 'Order 1',
          createdAt: '2023-10-01T00:00:00Z',
          updatedAt: '2023-10-01T00:00:00Z',
          number: 1,
        },
      ],
      total: 1,
      totalToday: 1,
    };

    const initialState = feed.getInitialState();
    const action = fetchOrders.fulfilled(feeds, 'requestId');
    const state = feed.reducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.feeds).toEqual(feeds);
    expect(state.error).toBeNull();
  });

  it('handles rejected', () => {
    const initialState = feed.getInitialState();
    const action = fetchOrders.rejected(new Error('Failed to fetch'), 'requestId');
    const state = feed.reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });
});