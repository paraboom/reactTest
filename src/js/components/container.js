var _ = require('underscore');
var React = require('react/addons');
var Row = require('./row');
var FriendlyMessage = require('./friendlyMessage');
var Statistics = require('./statistics');

var Container = React.createClass({

  componentWillMount: function(){
    var boxes = this.props.boxes;

    if (window.localStorage && localStorage.getItem('reactBoxes')) {
      boxes = JSON.parse(localStorage.getItem('reactBoxes'));
    }

    this.setState({
      boxes: boxes
    })
  },

  componentDidUpdate: function(){
    var boxes;

    if (window.localStorage) {
      boxes = JSON.stringify(this.state.boxes);
      localStorage.setItem('reactBoxes', boxes);
    }
  },

  getInitialState: function(){
    return {
      isHovered: false,
      friendlyMessage: false,
      boxes: [],
      boxesDeleted: 0
    }
  },

  getDefaultProps: function(){
    return {
      boxes: [1,2,3,4,5,6,7,8,9,10]
    }
  },

  _parseRows: function(boxes) {
    var rows = [];

    for (var i = 1, j = boxes.length, k = 1; i<=j; i++) {

      var rowIndex = Math.floor((i - 1) / 6);

      if (!rows[rowIndex]) {
        rows[rowIndex] = [[], [], []]
      }

      if (k <= 3) {
        rows[rowIndex][0].push({id: boxes[i-1], counter: i})
      } else if (k > 3 && k <= 5) {
        rows[rowIndex][1].push({id: boxes[i-1], counter: i})
      } else if (k > 5) {
        rows[rowIndex][2].push({id: boxes[i-1], counter: i})
      }

      if (i % 6 == 0) {
        k = 0;
      }

      k++
    }

    return _.flatten(rows, true)
  },

  _createRows: function(rows) {
    var that = this;
    return _.map(rows, function(row, i){
      if (row.length) {
        return (
          <Row
            key={i}
            boxes={row}
            boxesCount={that.state.boxes.length}
            onBoxMouseEnter={that.onBoxMouseEnter}
            onBoxMouseLeave={that.onBoxMouseLeave}
            onClick={that.onClick}
          />
        )
      }
    });
  },

  onBoxMouseEnter: function(){
    this.setState({
      isHovered: true
    });
  },

  onBoxMouseLeave: function(){
    this.setState({
      isHovered: false
    })
  },

  _showFriendlyMessage: function(index){
    var that = this;

    this.setState({
      friendlyMessage: 'Box with index - ' + index + ' was deleted'
    });

    if (this.tm) {
      clearTimeout(this.tm);
    }

    this.tm = setTimeout(function(){
      that.setState({
        friendlyMessage: false
      });
    }, 1500);
  },

  onClick: function(operation, box){
    var prevArray = this.state.boxes.slice(0);
    var maxIndex = Math.max.apply(Math, prevArray);
    var counter = box.counter;

    if (operation == 'add') {
      prevArray.splice(counter, 0, maxIndex + 1);
    } else if (operation == 'remove') {
      prevArray.splice(counter - 1, 1);
      this._showFriendlyMessage(box.id);
      this.setState({
        boxesDeleted: this.state.boxesDeleted + 1
      });
    }

    this.setState({
      boxes: prevArray
    });
  },

  _calculateColor: function(){
    var color = (255 - this.state.boxes.length * 3).toString(16);
    if (color.length == 1) {
      color = '0'+color;
    }
    return '#'+color+color+color;
  },

  render: function(){

    var rows = this._createRows(this._parseRows(this.state.boxes))

    var containerClassName = React.addons.classSet({
      "container-one": true,
      "container": true,
      "container-hovered": this.state.isHovered
    });

    var containerTwoStyle = {
      backgroundColor: this._calculateColor()
    };

    return (
      <div>
        {this.state.friendlyMessage ? <FriendlyMessage message={this.state.friendlyMessage}/> : ''}
        <Statistics {...this.state} />
        <div className={containerClassName}>
          <div className="container-two container" style={containerTwoStyle}>
            {rows}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Container;
