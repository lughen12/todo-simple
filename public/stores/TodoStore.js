'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Sortable = require('react-sortable-hoc');
var arrayMove = Sortable.arrayMove;

var TodoConstants = require('../constants/TodoConstants');

var CHANGE_EVENT = 'alert';

var todos = {
	notStart: [],
	onGoing: [],
	ended: []
};

var TodoStore = assign({}, EventEmitter.prototype, {
	
	getTodos: function() {
		return todos;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

});

Dispatcher.register(function(action) {
	switch (action.actionType) {
		case TodoConstants.ADD_TODO:
			todos.notStart.push(action.todo);
			TodoStore.emitChange();
			break;

		case TodoConstants.CHANGE_TODO_INDEX:
			if (todos[action.listId]) {
				todos[action.listId] = arrayMove(todos[action.listId], action.oldIndex, action.newIndex);
			}
			TodoStore.emitChange();
			break;

		case TodoConstants.MOVE_TODO:
			if (todos[action.oldListId]) {
				var todo = todos[action.oldListId][action.oldIndex];
				todos[action.oldListId].splice(todos[action.oldListId], 1);
				todos[action.newListId].push(todo);
			}
			TodoStore.emitChange();
			break;

		default:
			// no op
	}
});

module.exports = TodoStore;