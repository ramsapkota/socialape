import React from "react";
import PropTypes from "prop-types";

class FlashMessage extends React.Component {
  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id);
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.deleteFlashMessage(this.props.message.id);
    }, 5000);
  }

  render() {
    const { id, type, text } = this.props.message;
    const alertStyle =
      "alert " + (type === "success" ? "alert-success" : "alert-danger");
    return (
      <div className={alertStyle}>
        <button onClick={this.onClick} className="close">
          <span>&times;</span>
        </button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
