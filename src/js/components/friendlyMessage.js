var React = require('react/addons');

var FriendlyMessage = React.createClass({
  render: function(){
    return (
      <div className="message">
        {this.props.message}
      </div>
    )
  }
});

module.exports = FriendlyMessage;
