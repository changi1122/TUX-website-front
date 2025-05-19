import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, set } from '../modules/CounterModule';

function CounterComponent() {
  const value = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();
  console.log(value)

  return (
    <div>
      <h1>Counter: {value}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <br/>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <br/>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <br/>
      <button onClick={() => dispatch(set(10))}>Set to 10</button>
    </div>
  );
}

export default CounterComponent;