import React from 'react'
import ReactDOM from 'react-dom'
import Textarea from 'react-textarea-autosize'
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
      return state.map(todo => {
        if (todo.id !== action.id) return todo
        
        return {
          ...todo,
          text: action.text
        }
      })
      
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
      text: ''
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
    this.setState({text: ''})
    ReactDOM.findDOMNode(this.refs.newtodotext).value = ''
  }
  
  render() {
    return (
      <div className="newtodo-row">
        
        <div className="task-input">
          <Textarea className="task-textarea"
                    placeholder="Type in your new task"
                    type="text"
                    onChange={this.setText}
                    ref="newtodotext"
          />
        </div>
        
        <div className="task-add">
          <input type="submit"
                 value="ADD TASK"
                 onClick={this.addTodo}
          />
        </div>
      </div>
    )
  }
}

class TodoItem extends React.Component {
// Edit, remove and toggle a single task to 'done'
  
  constructor(props) {
    super()
    
//    this.editText = this.editText.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
  }
  
//  editText(event) {
//    this.setState({text: event.target.value})
//  }
  
  editTodo(event) {
    // var 'task' corresponds to Textarea component
    var task = event.target.parentNode.parentNode.parentNode.children[0]
    
    task.focus()
    task.select()
    task.readOnly = false
  }
  
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
  
  updateTodo(event) {
    ReactDOM.findDOMNode(this.refs.task).readOnly = true
    
    store.dispatch({
      type: 'EDIT_TODO',
      id: this.props.data.id,
      text: event.target.value
    })
  }
  
  render() {
    return (
      <div className="todo-row">
        <div className="task-container">
          <div className="task-row">
            <div className="task-toggle">
              <input id="toggle"
                     type="checkbox"
                     onClick={this.toggleTodo}
              />
            </div>
            <div className="task-taskitems-container">
              <div className="taskitems-row">
                <Textarea readOnly
                          ref="task"
                          className="task-textarea taskitems-text"
                          defaultValue={this.props.data.text}
                          onBlur={this.updateTodo}
                          onChange={this.editText}
                 />
                <div className="taskitems-options-container">
                  <div className="options-row">
                    <i className="options-edit"
                       onClick={this.editTodo}
                    />
                    <i className="options-delete"
                       onClick={this.removeTodo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class TodoList extends React.Component {
// Renders every task item already added
  
  render() {
    let todoitems = store.getState().map(
      item => <TodoItem key={item.id} data={item}/>
    )
    
    return <todolistcontainer>{todoitems}</todolistcontainer>
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