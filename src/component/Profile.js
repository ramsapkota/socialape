import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import TypoGraphy from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "@material-ui/core/Tooltip";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = {
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};
class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image, image);
    this.props.uploadImage(formData);
  };

  haldleEditPicture = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,

      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;
    console.log(this.props.user);
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="Profile" className="profile-image" />
              <input
                type="file"
                id="image-input"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <ToolTip title="Edit profile picture" placement="top">
                <IconButton onClick={this.haldleEditPicture} className="button">
                  <EditIcon color="primary" />
                </IconButton>
              </ToolTip>
              <EditDetails />
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/usrs/${handle}`}
                color="primary"
                varient="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <TypoGraphy variant="body2">{bio}</TypoGraphy>}
              <hr />
              {location && (
                <React.Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                </React.Fragment>
              )}
              {website && (
                <React.Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </React.Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <ToolTip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </ToolTip>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.Paper}>
          <TypoGraphy varietn="body2" align="center">
            No Profile found, please login again
          </TypoGraphy>
          <div className={classes.buttons}>
            <Button
              varient="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              varient="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading....</p>
    );
    return <div>{profileMarkup}</div>;
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
