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
      <div className="row-newtodo">
        
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
    
    this.editText = this.editText.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }
  
  editText(event) {
    this.setState({text: event.target.value})
  }
  
  editTodo(event) {
    store.dispatch({
      type: 'EDIT_TODO',
      id: this.props.data.id,
      text: this.state.text
    })
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
  
  render() {
    return (
      <div className="row-todo">
        
        <div className="container-task">  
          <div className="row-task">
            
            <div className="task-toggle">
              <input type="checkbox"
                     onClick={this.toggleTodo}
              />
            </div>

            <div className="task-container-taskitems">
               <div className="row-taskitems">
               
                 <Textarea className="task-textarea taskitems-text"
                          defaultValue={this.props.data.text}
                          onChange={this.editText}
                 />

                <taskoptions>
                  <taskedit onClick={this.editTodo}>
                    <i className="icon icon-placeholder ion-edit"></i>
                  </taskedit>
                  <i 
                   className="taskdelete"
                   onClick={this.removeTodo}
                  />
                </taskoptions>
                
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    )
//    return (
//      <tr>
//        <td>
//          <input type="checkbox" onClick={this.toggleTodo}></input>
//        </td>
//        <td>
//          <input defaultValue={this.props.data.text} onChange={this.editText}/>
//        </td>
//        <td onClick={this.editTodo}>e</td>
//        <td onClick={this.removeTodo}>x</td>
//      </tr>
//    )
  }
}

class TodoList extends React.Component {
// Renders every task item already added
  
  render() {
    let todoitems = store.getState().map(
      item => <TodoItem key={item.id} data={item}/>
    )
    
    return <todolistcontainer>{todoitems}</todolistcontainer>
  
//    return (
//      <table className="hover">
//        <thead>
//          <tr>
//            <th width="50"></th>
//            <th width="500"></th>
//            <th width="50"></th>
//            <th width="50"></th>
//          </tr>
//        </thead>
//        <tbody>
//          {todoitems}
//        </tbody>
//      </table>
//    )
    
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