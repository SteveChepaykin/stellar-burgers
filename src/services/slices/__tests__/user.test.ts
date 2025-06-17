import { userS, loginUser, getUser, updateUser, logoutUser, registerUser } from '../user';
import { TUser } from '../../../utils/types';
import { TLoginData, TAuthResponse, TRegisterData } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
}));

describe('user reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const loginData: TLoginData = {
    email: 'test@example.com',
    password: 'password123',
  };

  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  const apiResponse: TAuthResponse = {
    success: true,
    user,
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };

  it('handles loginUser.pending', () => {
    const initialState = userS.getInitialState();
    const action = loginUser.pending('requestId', loginData);
    const state = userS.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('handles loginUser.fulfilled', () => {
    const loginUserApi = require('../../../utils/burger-api').loginUserApi;
    loginUserApi.mockResolvedValue(apiResponse);

    const initialState = userS.getInitialState();
    const action = loginUser.fulfilled(user, 'requestId', loginData);
    const state = userS.reducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles loginUser.rejected', () => {
    const initialState = userS.getInitialState();
    const action = loginUser.rejected(new Error('Invalid credentials'), 'requestId', loginData);
    const state = userS.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('handles logoutUser.fulfilled', () => {
    const logoutApi = require('../../../utils/burger-api').logoutApi;
    logoutApi.mockResolvedValue({ success: true });

    const initialState = userS.getInitialState();
    const action = logoutUser.fulfilled(undefined, 'requestId');
    const state = userS.reducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles getUser.pending', () => {
    const initialState = userS.getInitialState();
    const action = getUser.pending('requestId');
    const state = userS.reducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  it('handles getUser.fulfilled', () => {
    const getUserApi = require('../../../utils/burger-api').getUserApi;
    getUserApi.mockResolvedValue({ success: true, user });

    const initialState = userS.getInitialState();
    const action = getUser.fulfilled({ success: true, user }, 'requestId');
    const state = userS.reducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles getUser.rejected', () => {
    const getUserApi = require('../../../utils/burger-api').getUserApi;
    getUserApi.mockRejectedValue(new Error('Failed to fetch user'));

    const initialState = userS.getInitialState();
    const action = getUser.rejected(new Error('Failed to fetch user'), 'requestId');
    const state = userS.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles updateUser.fulfilled', () => {
    const updateUserApi = require('../../../utils/burger-api').updateUserApi;
    updateUserApi.mockResolvedValue({ success: true, user: { ...user, name: 'Updated User' } });

    const initialState = userS.getInitialState();
    const action = updateUser.fulfilled({ success: true, user: { ...user, name: 'Updated User' } }, 'requestId', { name: 'Updated User' });
    const state = userS.reducer(initialState, action);

    expect(state.user).toEqual({ ...user, name: 'Updated User' });
    expect(state.isLoading).toBe(false);
  });
});