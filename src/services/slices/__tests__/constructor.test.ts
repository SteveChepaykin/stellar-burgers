import { burgerConstructor, addIngredient, removeIngredient, moveIngredient } from '../burgerConstructor';
import { TIngredient } from '../../../utils/types';

jest.mock('../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
}));

describe('constructor reducer', ()=> {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it('ingredient add action handling', () => {
      const ingredient: TIngredient = {
        _id: '1',
        name: 'main ingredient',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png'
      };
      const initialState = burgerConstructor.getInitialState();
      const action = addIngredient(ingredient);
      const state = burgerConstructor.reducer(initialState, action);
      expect(state.constructorItems.ingredients).toContainEqual(ingredient);
    });
    
    it('ingredient delete action handling', () => {
      const ingredient: TIngredient = {
        _id: '1',
        name: 'main ingredient',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png'
      };
  
      const initialState = {
        ...burgerConstructor.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [ingredient],
        },
      };
      const action = removeIngredient(0);
      const state = burgerConstructor.reducer(initialState, action);
      expect(state.constructorItems.ingredients).not.toContainEqual(ingredient);
    });
  
    it('ingredient order change action handling', () => {
      const ingredient1: TIngredient = {
        _id: '1',
        name: 'main ingredient',
        type: 'main',
        proteins: 15,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png'
      };
  
      const ingredient2: TIngredient = {
        _id: '2',
        name: 'secondary ingredient',
        type: 'secondary',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 10,
        price: 10,
        image: 'image.png',
        image_mobile: 'image_mobile.png',
        image_large: 'image_large.png'
      };
  
      const initialState = {
        ...burgerConstructor.getInitialState(),
        constructorItems: {
          bun: null,
          ingredients: [ingredient1, ingredient2],
        },
      };
  
      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = burgerConstructor.reducer(initialState, action);
      expect(state.constructorItems.ingredients).toEqual([ingredient2, ingredient1]);
    });
  });