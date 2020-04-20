import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeDialog: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
  expandButton: {
    left: "90%",
    position: "absolute",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    this.props.getPost(this.props.postId);
    this.setState({ open: true, oldPath, newPath });
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress thickness={2} size={100} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          tip="Expand Post"
          onClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeDialog}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  userHandle: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog)
);
