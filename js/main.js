import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// REDUX STORE

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    
    case 'DECREMENT':
      return state - 1
    
    default:
      return state
  }
}

// REACT COMPONENTS

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <buttonbox>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </buttonbox>
  </div>
)

// OUTPUT

const store = createStore(counter)

const App = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('app')
  )
}

store.subscribe(App)

App()