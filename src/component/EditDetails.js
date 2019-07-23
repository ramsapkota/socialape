import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { editUserDetails } from "../redux/actions/userActions";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    oopen: false
  };

  componentDidMount;

  render() {
    console.log(styles);
    return <div className={styles.profile}>Edit</div>;
  }
}
const mapStateToProps = state => ({
  credentials: state.user.credentials
});

editUserDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
