import { getOrders, orders } from '../orders';

jest.mock('../../../utils/burger-api', () => ({
  getOrdersApi: jest.fn(),
}));

describe('orders reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles pending', () => {
    const initialState = orders.getInitialState();
    const action = getOrders.pending('requestId');
    const state = orders.reducer(initialState, action);
    expect(state.orders).toEqual([]);
  });

  it('handles fulfilled', () => {
    const mockOrders = [
      {
        _id: '1',
        ingredients: ['main ingredient', 'secondary ingredient'],
        status: 'done',
        name: 'Order 1',
        createdAt: '2023-10-01T00:00:00Z',
        updatedAt: '2023-10-01T00:00:00Z',
        number: 1,
      },
    ];

    const initialState = orders.getInitialState();
    const action = getOrders.fulfilled(mockOrders, 'requestId');
    const state = orders.reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders);
  });

  it('handles rejected', () => {
    const initialState = orders.getInitialState();
    const action = getOrders.rejected(new Error('Failed to fetch'), 'requestId');
    const state = orders.reducer(initialState, action);
    expect(state.orders).toEqual([]);
  });
});
