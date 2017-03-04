'use strict';

var React = require('react');

var TodoStore = require('../../stores/TodoStore.js');
var TodoActions = require('../../actions/TodoActions.js');

function TotalProjects(props) {
  return (
    <div className='zendesk-todo-total-projects'>
      {'Total: ' + props.totalProjects + ' projects'}
    </div>
  );
}

var TodoInput = React.createClass({

  getInitialState: function() {
    return {
      totalProjects: 0
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this.onStoreChanged);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this.onStoreChanged);
  },

  render: function render() {
    return (
      <div className='zendesk-todo-input-container'>
        <input ref='newTodoInput' type='text' className='form-control' placeholder='Enter project name' onKeyPress={this.onKeyPress}></input>
        <button className='btn btn-success' type='text' onClick={this.onAdd}>Add project</button>
        <TotalProjects totalProjects={this.state.totalProjects}/>
      </div>
    );
  },

  onKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.onAdd();
    }
  },

  onAdd: function() {
    if (this.refs.newTodoInput.value != '') {
      var newTodo = this.refs.newTodoInput.value;
      this.refs.newTodoInput.value = '';
      TodoActions.addTodo(newTodo);
    }
  },

  onStoreChanged: function() {
    var newTodos = TodoStore.getTodos();
    var totalProjects = 0;

    for (var key in newTodos) {
      if (newTodos.hasOwnProperty(key)) {
        totalProjects += newTodos[key].length;
      }
    }

    this.setState({
      totalProjects: totalProjects
    });
  }
});

module.exports = TodoInput;