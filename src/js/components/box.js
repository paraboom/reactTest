var React = require('react/addons');

var Box = React.createClass({

  getInitialState: function(){
    return {
      isHovered: false
    }
  },

  onMouseEnter: function(){
    this.setState({
      isHovered: true
    });

    this.props.onBoxMouseEnter();
  },

  onMouseLeave: function(){
    this.setState({
      isHovered: false
    });

    this.props.onBoxMouseLeave();
  },

  onClick: function(e){
    e.preventDefault();

    this.props.onClick('add', this.props);
  },

  onIconClick: function(e){
    e.stopPropagation();
    e.preventDefault();

    this.props.onClick('remove', this.props);
  },

  render: function(){

    var boxClassName = React.addons.classSet({
      "box": true,
      "box-red": this.props.counter % 2 == 0,
      "box-green": this.props.counter % 3 == 0,
      "box-blue": this.props.counter % 4 == 0,
      "box-last": this.props.isLast,
      "box-hovered": this.state.isHovered
    });

    return (
      <div
        className={boxClassName}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}>
        <div className="box-container">
          <span className="box-icon glyphicon glyphicon-remove" onClick={this.onIconClick}></span>
          <div className="box-header">
            <span className="box-id">{this.props.id}</span>
          </div>
          <div className="box-content">
            <span className="box-prev">{this.props.prevId}</span>
            <span className="box-next">{this.props.nextId}</span>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Box;
