'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TodoInput = require('./components/TodoInput.jsx');
var TodoList = require('./components/TodoList.jsx');

var TodoStore = require('../stores/TodoStore.js');
var TodoActions = require('../actions/TodoActions.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      todos: {
        notStart: [],
        onGoing: [],
        ended: []
      },
      displayNames: {
        notStart: 'To do',
        onGoing: 'In progress',
        ended: 'Done'
      }
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this.onStoreChanged);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this.onStoreChanged);
  },

  render: function render() {
    var todoLists = [];

    for (var key in this.state.todos) {
      if (this.state.todos.hasOwnProperty(key)) {
        todoLists.push(
          <div key={key} className="col-md-4" >
            <TodoList
              listId={key}
              ref={key}
              displayName={this.state.displayNames[key]}
              todos={this.state.todos[key]}
              onSortEnd ={this.onSortEnd} />
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <TodoInput />
        </div>
        <div className="row zendesk-sortable-list-container">
          { todoLists }
        </div>
      </div>
    );
  },

  onStoreChanged: function() {
    this.setState({
      todos: TodoStore.getTodos()
    });
  },

  onSortEnd : function(fromListId, clientX, clientY, oldIndex, newIndex) {
    var newListId = this.dropOnOtherList(fromListId, clientX, clientY);

    if (!newListId) {
      TodoActions.changeTodoIndex(fromListId, oldIndex, newIndex);
    } else {
      TodoActions.moveTodo(fromListId, oldIndex, newListId);
    }
  },

  dropOnOtherList: function(fromListId, clientX, clientY) {
    var rectToCheck = [];

    for (var key in this.state.todos) {
      if (this.state.todos.hasOwnProperty(key)) {
        if (fromListId !== key) {
          rectToCheck.push(this.getRectBoundByListKey(key));
        }
      }
    }

    var newListId;
    rectToCheck.forEach(function(boundRect) {
      if (clientX < boundRect.right && clientX > boundRect.left && clientY < boundRect.bottom && clientY > boundRect.top) {
        newListId=boundRect.id;
      }
    });

    return newListId;
  },

  getRectBoundByListKey: function(listKey) {
    var targetListBoundRect;
    var targetList = ReactDOM.findDOMNode(this.refs[listKey]);
    if (targetList) {
      targetListBoundRect = targetList.getBoundingClientRect();
      targetListBoundRect.id=listKey;
    }

    return targetListBoundRect;
  }
});
