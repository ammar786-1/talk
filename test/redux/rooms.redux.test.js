import { createStore } from 'redux';
import { addRoom, removeRoom } from '../../src/redux/actions';
import talk from '../../src/redux/reducers';

describe('test reduce rooms', () => {
  let store;
  beforeAll(() => {
    store = createStore(talk);
  });

  test('should add new room', async () => {
    store.dispatch(addRoom(1, 'test'));
    const state = await store.getState();
    // console.log(state);
    expect(state.rooms).toHaveLength(1);
  });

  test('should remove room', async () => {
    store.dispatch(removeRoom(1));
    const state = await store.getState();
    expect(state.rooms).toHaveLength(0);
  });
});
