import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

import Mybutton from "../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};
export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <Mybutton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </Mybutton>
    ) : this.likedScream() ? (
      <Mybutton tip="Undo Like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </Mybutton>
    ) : (
      <Mybutton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </Mybutton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />{" "}
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}{" "}
          </Typography>{" "}
          <Typography variant="body2" color="textSecondary">
            {" "}
            {dayjs(createdAt).fromNow()}{" "}
          </Typography>{" "}
          <Typography variant="body1"> {body} </Typography> {likeButton}
          <span>{likeCount} Likes</span>
          <Mybutton tip="comments">
            <ChatIcon color="primary" />
          </Mybutton>
          <span>{commentCount} comments</span>
        </CardContent>{" "}
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  likeScream,
  unlikeScream
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
