import { createStore } from 'redux';
import { setUsername } from '../actions';
import talk from '../reducers';

describe('test reduce username', () => {
  let store;
  beforeAll(() => {
    store = createStore(talk);
  });

  test('should set username', async () => {
    const username = 'test';
    store.dispatch(setUsername(username));
    const state = await store.getState();
    // console.log(state);
    expect(state.username).toEqual(username);
  });
});
