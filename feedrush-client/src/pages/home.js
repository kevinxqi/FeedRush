import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import PostSkeleton from "../util/PostSkeleton";
// Redux
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { loading, posts } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(home);
