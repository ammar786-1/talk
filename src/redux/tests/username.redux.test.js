import { createStore } from 'redux';
import { initialState } from '../../components/App/App';
import { setUsername } from '../actions/appActions';
import { appReducer } from '../reducers';

describe('test reduce username', () => {
  let store;
  beforeAll(() => {
    store = createStore(appReducer, initialState);
  });

  test('should set username', async () => {
    const username = 'test';
    store.dispatch(setUsername(username));
    const state = await store.getState();
    // console.log(state);
    expect(state.username).toEqual(username);
  });
});
