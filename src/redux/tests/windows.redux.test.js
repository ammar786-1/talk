import { createStore } from 'redux';
import { initialState } from '../../components/App/App';
import { closeWindow, openWindow } from '../actions/appActions';
import { appReducer } from '../reducers';

describe('test reduce windows', () => {
  let store;
  beforeAll(() => {
    store = createStore(appReducer, initialState);
  });

  test('should open window', async () => {
    const roomKey = 'key';
    store.dispatch(openWindow(roomKey));
    const state = await store.getState();
    // console.log(state);
    expect(state.windows).toHaveLength(1);
    expect(state.windows).toContain(roomKey);
  });

  test('should close window', async () => {
    const roomKey = 'key';
    store.dispatch(closeWindow(roomKey));
    const state = await store.getState();
    // console.log(state);
    expect(state.windows).toHaveLength(0);
    expect(state.windows).not.toContain(roomKey);
  });
});
