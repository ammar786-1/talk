import { createStore } from 'redux';
import { addRoom, addRooms, removeRoom } from '../actions';
import talk from '../reducers';

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

  test('should add new rooms', async () => {
    store.dispatch(
      addRooms([{ key: 1, title: 'test' }, { key: 2, title: 'test2' }])
    );
    const state = await store.getState();
    // console.log(state);
    expect(state.rooms).toHaveLength(2);
  });

  test('should remove room', async () => {
    store.dispatch(removeRoom(1));
    const state = await store.getState();
    expect(state.rooms).toHaveLength(0);
  });
});
