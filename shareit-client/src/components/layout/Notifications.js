import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
//MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import {Link} from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
//Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import dayjs from "dayjs";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsId = this.props.notifications
      .filter((noti) => !noti.read)
      .map((noti) => noti.notificationId);

    this.props.markNotificationsRead(unreadNotificationsId);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    dayjs.extend(relativeTime);
    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((noti) => noti.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((noti) => noti.read === false).length
              }
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((noti) => {
          const verb = noti.type === "like" ? "liked" : "commented on";
          const time = dayjs(noti.createdAt).fromNow();
          const iconColor = noti.read ? "primary" : "secondary";
          const icon =
            noti.type === "like" ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={noti.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${noti.recipient}/post/${noti.postId}`}
              >
                {noti.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
