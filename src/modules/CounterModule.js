import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
  value: 0,
};

/* 액션 타입 */
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const RESET = 'counter/RESET';
export const SET = 'counter/SET';

/* 액션 생성자 */
export const { counter: { increment, decrement, reset, set } } = createActions({
  [INCREMENT]: () => {},
  [DECREMENT]: () => {},
  [RESET]: () => {},
  [SET]: (value) => value
});

/* 리듀서 */
const counterReducer = handleActions(
  {
    [INCREMENT]: (state) => ({ value: state.value + 1 }),
    [DECREMENT]: (state) => ({ value: state.value - 1 }),
    [RESET]: () => ({ value: 0 }),
    [SET]: (state, { payload }) => ({ value: payload }),
  },
  initialState
);

export default counterReducer