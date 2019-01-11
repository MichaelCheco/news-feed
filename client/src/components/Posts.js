import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";
import { POSTS_PER_PAGE } from "../constants";
import { CubeGrid } from "styled-spinkit";
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  overflow: hidden;
  margin-top: 55px;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;
const Pagination = styled.div`
  display: flex;
  height: 20px;
  justify-content: flex-end;
  padding: 15px 3px;
  padding-bottom: 25px;
  margin-bottom: 10px;
  `;
const Button = styled.button`
  margin-right: 18px;
  height: 30px;
  border-radius: 1px;
  color: grey;
  font-size:  15px;
  background: inherit;
  :focus {
    outline: 0;
  }
  :hover {
    color: ${props => props.theme.darkBlue};
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const POSTS_QUERY = gql`
  query PostsQuery($first: Int, $skip: Int) {
    feed(first: $first, skip: $skip) {
      id
      title
      content
      published
      createdAt
      author {
        name
      }
    }
  }
`;
const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    post {
      id
      title
      content
      published
      createdAt
      author {
        name
      }
    }
  }
`;

class Posts extends Component {
  _getPostsToRender = data => {
    const isNewPage = this.props.location.pathname.includes("new");
    if (isNewPage) {
      return data.feed;
    }
  };

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10);
    const nextPage = page + 1;
    this.props.history.push(`/new/${nextPage}`);
  };
  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      this.props.history.push(`/new/${previousPage}`);
    }
  };

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes("new");
    const page = parseInt(this.props.match.params.page, 10);
    const skip = isNewPage ? (page - 1) * POSTS_PER_PAGE : 0;
    const first = isNewPage ? POSTS_PER_PAGE : 100;
    return { skip, first };
  };

  _subscribeToNewPosts = async subscribeToMore => {
    subscribeToMore({
      document: NEW_POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.posts;
        return Object.assign({}, prev, {
          feed: [newPost, ...prev.feed],
          __typename: prev.feed.__typename
        });
      }
    });
  };
  render() {
    return (
      <Container>
        <Query query={POSTS_QUERY} variables={this._getQueryVariables()}>
          {({ loading, error, data, subscribeToMore, refetch }) => {
            if (loading)
              return <CubeGrid size={90} color={props => props.theme.red} />;
            if (error) return <h3>Error:`${error}` . . .</h3>;
            this._subscribeToNewPosts(subscribeToMore);
            const posts = this._getPostsToRender(data);
            const isNewPage = this.props.location.pathname.includes("new");
            const pageIndex = this.props.match.params.page
              ? (this.props.match.params.page - 1) * POSTS_PER_PAGE
              : 0;
            return (
              <div>
                {isNewPage && (
                  <Pagination>
                    <Button onClick={this._previousPage}>Previous</Button>
                    <Button onClick={() => this._nextPage(data)}>Next</Button>
                  </Pagination>
                )}
                {posts &&
                  posts.map(post => (
                    <Post
                      key={post.id}
                      post={post}
                      refresh={() => refetch()}
                      isDraft={!post.published}
                    />
                  ))}
                {this.props.children}
              </div>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default Posts;
