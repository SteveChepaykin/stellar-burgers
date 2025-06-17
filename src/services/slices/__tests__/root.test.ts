import store, {reducer} from '../../store';

describe('root reducer', () => {
  it('should not mutate state for unknown action', () => {
    const prevState = store.getState();
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const rootReducer = reducer;
    const nextState = rootReducer(prevState, unknownAction);
    expect(nextState).toEqual(prevState);
    expect(nextState.burgerIngredients).toBe(prevState.burgerIngredients);
    expect(nextState.burgerConstructor).toBe(prevState.burgerConstructor);
    expect(nextState.feeds).toBe(prevState.feeds);
    expect(nextState.user).toBe(prevState.user);
    expect(nextState.orders).toBe(prevState.orders);
  });
});