import { burgerIngredients, fetchBurgerIngredients } from '../burgerIngredients';
import { TIngredient } from '../../../utils/types';

jest.mock('../../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn(),
}));

describe('burger ingredients reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles pending', () => {
    const initialState = burgerIngredients.getInitialState();
    const action = fetchBurgerIngredients.pending('requestId');
    const state = burgerIngredients.reducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image1.png',
        image_mobile: 'image1_mobile.png',
        image_large: 'image1_large.png',
      },
    ];

    const initialState = burgerIngredients.getInitialState();
    const action = fetchBurgerIngredients.fulfilled(ingredients, 'requestId');
    const state = burgerIngredients.reducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.ingredients).toEqual(ingredients);
    expect(state.error).toBeNull();
  });

  it('handles rejected', () => {
    const initialState = burgerIngredients.getInitialState();
    const action = fetchBurgerIngredients.rejected(new Error('Failed to fetch'), 'requestId');
    const state = burgerIngredients.reducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });
});