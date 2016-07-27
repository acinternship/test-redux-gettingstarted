import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

//// Reducer
//const todoapp = (state = [], action) => {
//  switch (action.type) {
//    case 'ADD_TODO':
//      return [
//        ...state,
//        {
//          id: action.id,
//          text: action.text,
//          completed: false
//        }
//      ]
//    
//    default:
//      return state
//  }
//}
//
//// React components
//const TodoAdd = (add, text) => (
//  <div>
//    <textarea>{text}</textarea>
//    <button onClick={add}>ADD TODO</button>
//  </div>
//)
//
//// Output
//const store = createStore(todoapp)
//
//const App = () => (
//  ReactDOM.render(
//    <TodoAdd
//      text={store.getState().text}
//      add={store.dispatch({type: 'ADD_TODO'})}
//    />,
//    document.getElementById('todoadd')
//  )
//)
//
//store.subscribe(App)
//App()

/*** REDUX COUNTER ***/

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

const NewTodo = ({value, onIncrement}) => (
  <div>
    <textarea>{value}</textarea>
    <button onClick={onIncrement}>+</button>
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
  
  ReactDOM.render(
    <NewTodo
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
    />,
    document.getElementById('newtodo')
  )
}

store.subscribe(App)
App()