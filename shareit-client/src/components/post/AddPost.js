import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//Redux
import { connect } from "react-redux";
import { addPost, clearErrors } from "../../redux/actions/dataActions";
import { DialogContent } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "relative",
    marginTop: 15,
    float: "right",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeDialog: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
});

class AddPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addPost({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create New Post">
          <AddIcon />
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
          <DialogTitle>Create New Post</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="body"
                type="text"
                label="Share something"
                multiline
                rows="3"
                placeholder="Share it"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                color="primary"
                type="submit"
                variant="contained"
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost)
);
