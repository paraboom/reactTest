var _ = require('underscore');
var React = require('react/addons');
var Box = require('./box');

var Row = React.createClass({

  _parseBoxes: function(boxes){
    var that = this;
    return _.map(boxes, function(box, i){
      var prev = boxes[i - 1] && boxes[i - 1].id;
      var next = boxes[i + 1] && boxes[i + 1].id;

      return (
        <Box
          key={i}
          isLast={box.counter == that.props.boxesCount}
          counter={box.counter}
          id={box.id}
          prevId={prev}
          nextId={next}
          onBoxMouseEnter={that.props.onBoxMouseEnter}
          onBoxMouseLeave={that.props.onBoxMouseLeave}
          onClick={that.props.onClick}
        />
      )
    })
  },

  render: function(){

    var boxes = this._parseBoxes(this.props.boxes);

    var rowClassName = React.addons.classSet("row-" + this.props.boxes.length, "row");

    return (
      <div className={rowClassName}>
        {boxes}
      </div>
    )
  }
});

module.exports = Row;
