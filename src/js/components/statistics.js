var React = require('react/addons');

var Statistics = React.createClass({
  render: function(){
    return (
      <div className="statistics">
        <div className="statistics-row">Overall boxes on page: {this.props.boxes.length}</div>
        <div className="statistics-row">Boxes were deleted (for session): {this.props.boxesDeleted}</div>
      </div>
    )
  }
});

module.exports = Statistics;
