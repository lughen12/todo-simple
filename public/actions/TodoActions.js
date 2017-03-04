'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

	addTodo: function(todo) {
		Dispatcher.dispatch({
			actionType: TodoConstants.ADD_TODO,
			todo: todo
		});
	},

	changeTodoIndex: function(listId, oldIndex, newIndex) {
		Dispatcher.dispatch({
			actionType: TodoConstants.CHANGE_TODO_INDEX,
			listId: listId,
			oldIndex: oldIndex,
			newIndex: newIndex
		});
	},

	moveTodo: function(oldListId, oldIndex, newListId) {
		Dispatcher.dispatch({
			actionType: TodoConstants.MOVE_TODO,
			oldListId: oldListId,
			oldIndex: oldIndex,
			newListId: newListId
		});
	}

};

module.exports = TodoActions;