import { createStore } from 'redux';
import { closeWindow, openWindow } from '../../src/redux/actions';
import talk from '../../src/redux/reducers';

describe('test reduce windows', () => {
  let store;
  beforeAll(() => {
    store = createStore(talk);
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
