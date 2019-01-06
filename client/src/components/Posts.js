import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";
import { CubeGrid } from 'styled-spinkit'
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  overflow: scroll;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  margin-top: 30px;
  background: white;
  border: 1px solid grey;
  border-radius: 3px;
`;
const POSTS_QUERY = gql`
  query {
    feed {
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
`

class Posts extends Component {
  _subscribeToNewPosts = async subscribeToMore => {
    subscribeToMore({
      document: NEW_POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newPost = subscriptionData.data.posts
        return Object.assign({}, prev, {
          feed: [newPost, ...prev.feed],
          __typename: prev.feed.__typename
          
        })
      }
    })
  }
  render() {
    return (
      <Container>
        <Query query={POSTS_QUERY}>
          {({ loading, error, data, subscribeToMore }) => {
            console.log(data, "DATA");
            if (loading) return <CubeGrid size={90} color={props => props.theme.red} />;
            if (error) return <h3>Error:`${error}` . . .</h3>;
            this._subscribeToNewPosts(subscribeToMore)
            const posts = data.feed;
            return (
              <div>
                {posts &&
                  posts.map(post => (
                    <Post
                      key={post.id}
                      post={post}
                      
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
