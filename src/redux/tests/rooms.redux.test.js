import { createStore } from 'redux';
import { initialState } from '../../components/App/App';
import { addRoom, addRooms, removeRoom } from '../actions/appActions';
import { appReducer } from '../reducers';

describe('test reduce rooms', () => {
  let store;
  beforeAll(() => {
    store = createStore(appReducer, initialState);
  });

  test('should add new room', async () => {
    store.dispatch(addRoom(1, 'test'));
    const state = await store.getState();
    expect(state.rooms).toHaveLength(1);
    expect(state.rooms).toStrictEqual([
      {
        key: 1,
        name: 'test'
      }
    ]);
  });

  test('should add new rooms', async () => {
    store.dispatch(
      addRooms([{ key: 2, title: 'test1' }, { key: 3, title: 'test2' }])
    );
    const state = await store.getState();
    // console.log(state);
    expect(state.rooms).toHaveLength(3);
  });

  test('should remove room', async () => {
    store.dispatch(removeRoom(1));
    const state = await store.getState();
    expect(state.rooms).toHaveLength(2);
  });
});
