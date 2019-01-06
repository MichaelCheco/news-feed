import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "./Post";
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

class Posts extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Query query={POSTS_QUERY}>
          {({ loading, error, data, refetch }) => {
            console.log(data, "DATA");
            if (loading) return <h3>Loading . . .</h3>;
            if (error) return <h3>Error:`${error}` . . .</h3>;
            const posts = data.feed;
            return (
              <div>
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
