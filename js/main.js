import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

/*** REDUX STORE ***/

const todoapp = (state = [], action) => {
// Handles every action of Todo App, such as adding,
// editing, removing and toggling a task
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
    
    case 'EDIT_TODO':
      return state
      
    case 'REMOVE_TODO':      
      for (var i = 0; i < store.getState().length; i++) {
        if (state[i].id === action.id) {
          state.splice(i, 1)
        }
      }
    
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) return todo
        
        return {
          ...todo,
          completed: !todo.completed
        }
      })
      
    default:
      return state
  }
}

const store = createStore(todoapp)

var todoID = store.getState().length // Used to set unique identifiers to each task

/*** REACT COMPONENTS ***/

class NewTodo extends React.Component {
// Create a new task
  constructor() {
    super()
    
    this.state = {
      text: 'Type in your new task'
    }
    
    this.setText = this.setText.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }
    
  setText(event) {
    this.setState({text: event.target.value})
  }
  
  addTodo() {
    store.dispatch({
      type: 'ADD_TODO',
      id: todoID++,
      text: this.state.text
    })
    
    // Resets input value afterwards
    this.setState({text: 'Type in your new task'})
    ReactDOM.findDOMNode(this.refs.newtodotext).value = ''
  }
  
  render() {
    return (
      <newtodocontainer className="input-group">
        <input className="input-group-field" type="text" placeholder={this.state.text} onChange={this.setText} ref="newtodotext"/>
        
        <div className="input-group-button">
          <input type="submit" className="button" value="Add item" onClick={this.addTodo}></input>
        </div>
      </newtodocontainer>
    )
  }
}

class TodoItem extends React.Component {
// Edit, remove and toggle a single task to 'done'
  
  constructor(props) {
    super()
    
    this.removeTodo = this.removeTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }
  
  editTodo() {} // Still to be implemented
  
  removeTodo() {
    store.dispatch({
      type: 'REMOVE_TODO',
      id: this.props.data.id
    })
  }
  
  toggleTodo(event) {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: this.props.data.id
    })
  }
  
  render() {
    return (
      <tr>
        <td>
          <input type="checkbox" onClick={this.toggleTodo}></input>
        </td>
        <td>
          <textarea value={this.props.data.text}></textarea>
        </td>
        <td onClick={this.removeTodo}>x</td>
      </tr>
    )
  }
}

class TodoList extends React.Component {
// Renders every task item already added
  
  render() {
    let todoitems = store.getState().map(
      item => <TodoItem key={item.id} data={item}/>
    )
    
    return (
      <table className="hover">
        <thead>
          <tr>
            <th width="50"></th>
            <th width="500"></th>
            <th width="50"></th>
          </tr>
        </thead>
        <tbody>
          {todoitems}
        </tbody>
      </table>
    )
  }
}

/*** OUTPUT ***/

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