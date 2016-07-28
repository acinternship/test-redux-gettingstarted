import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

/*** REDUX TODO APP ***/

// REDUX STORE
const counter = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    
    default:
      return state
  }
}

const store = createStore(counter)

// REACT COMPONENTS

const TodoItem = (props) => (
    <tr>
      <td>{props.data.id}</td>
      <td>{props.data.text}</td>
    </tr>
)

var TodoList = React.createClass({
  render: function() {
    let rows = store.getState().map(
      item => <TodoItem key={item.id} data={item}/>
    )
    
    return (
      <table className="hover">
        <thead>
          <tr>
            <th width="100"></th>
            <th width="500"></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
})

var NewTodo = React.createClass({
  getInitialState: function() {
    return {text: 'Type in a new task'}
  },
  
  updateText: function(event) {
    this.setState({text: event.target.value})
  },
  
  addTodo: function() {
    store.dispatch({
      type: 'ADD_TODO',
      id: store.getState().length,
      text: this.state.text
    })
    this.state.text = 'Type in a new task'
  },
  
  render: function() {
    return (
      <newtodocontainer className="input-group">
        <input className="input-group-field" type="text" value={this.state.text} onChange={this.updateText}/>
        <div className="input-group-button">
          <input type="submit" className="button" value="Add item" onClick={this.addTodo}></input>
        </div>
      </newtodocontainer>
    )
  }
})

// OUTPUT

const App = () => {
  console.log(store.getState())
  
  ReactDOM.render(
    <NewTodo/>, document.getElementById('newtodo')
  )
  
  ReactDOM.render(
    <TodoList/>, document.getElementById('todolist')
  )
}

store.subscribe(App)
App()