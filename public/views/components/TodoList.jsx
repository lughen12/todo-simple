'use strict';

var React = require('react');
var Sortable = require('react-sortable-hoc');
var SortableContainer = Sortable.SortableContainer;
var SortableElement = Sortable.SortableElement;

var SortableItem = SortableElement(function (props) {
  return (
    <div className="zendesk-sortable-list-item">
      {props.value}
    </div>
  );
});

var SortableList = SortableContainer(function (props) {
  return (
    <div className="zendesk-sortable-list-body">
      {
        (Array.isArray(props.items) && props.items.length > 0)
        ? props.items.map(function(value, index) {
            return (
              <SortableItem key={'item-' + index} index={index} value={value} />
            );
          })
        : <p className='zendesk-sortable-list-empty'>No project here.</p>
      }
    </div>
  );
});

var TodoList = React.createClass({

  render: function() {
    return (
      <div className="zendesk-sortable-list-panel">
        <div className="zendesk-sortable-list-header">
          {this.props.displayName}
          <span className='badge'>{this.props.todos.length}</span>
        </div>
        <SortableList items={this.props.todos ? this.props.todos : []} onSortEnd={this.onSortEndHandle} />
      </div>
    )
  },

  onSortEndHandle: function (sortableEvt, evt) {
    var clientX = evt.clientX;
    var clientY = evt.clientY;

    if (evt.type === 'touchend') {
      clientX = event.changedTouches[event.changedTouches.length-1].clientX;
      clientY = event.changedTouches[event.changedTouches.length-1].clientY;
    }

    this.props.onSortEnd(this.props.listId, clientX, clientY, sortableEvt.oldIndex, sortableEvt.newIndex);
  }
});

module.exports = TodoList;