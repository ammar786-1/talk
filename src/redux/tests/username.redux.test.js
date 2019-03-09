import { initialState } from '../../components/App/App';
import { setUsername } from '../actions/appActions';
import { appReducer } from '../reducers';

describe('test reduce username', () => {
  test('should set username', async () => {
    const username = 'test';
    const newState = appReducer(initialState, setUsername(username));
    expect(newState.username).toEqual(username);
  });
});
