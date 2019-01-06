import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
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
const Input = styled.input`
font-size: 20px;
  margin-top: 10px;
  width: 350px;
  height: 50px;
  border: 1px solid lightgray;
  :focus {
      outline: 0;
  }
`;
const Button = styled.button`
  margin-top: 10px;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.mediumBlue};
  color: white;
  padding: 5px;
  :focus {
      outline: 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const H2 = styled.h2`
  color: black;
  height: 20px;
`;
const Author = styled.p`
    font-style: italic;
    font-size: 12px;
    text-decoration: underline;
`;
const P = styled.p`
  color: black;
  height: 80px;
  overflow: hidden;
  font-size: 14px;
`;
const Content = styled.div`
  width: 70%;
  height: 200px;
  overflow: hidden;
  padding: 15px;

`;
const Button2 = styled.div`
    width: 150px;
    height: 55px;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    padding: 9px;
    background: ${props => props.theme.darkBlue};
    :hover {
        cursor: pointer;
        background: #00446698;
    }
    a {
        color: white;
        text-align: center;
    }
`;
const ButtonDiv = styled.div`
    width: 200px;
   height: 200px;
   display: flex;
   align-items: center;
   justify-content: center;
`;
const Div = styled.div`
    display: flex;
`;
const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($searchString: String!) {
    filterPosts(searchString: $searchString) {
      id
      title
      content
      createdAt
      published
      author {
        name
      }
    }
  }
`;

class Search extends Component {
  state = {
    posts: [],
    searchString: ""
  };
  _executeSearch = async () => {
    const { searchString } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { searchString }
    });
    const posts = result.data.filterPosts;
    this.setState({ posts });
  };
  render() {
    return (
      <Container>
        <Wrapper>
          <Input
            type="text"
            placeholder="Search"
            onChange={e => this.setState({ searchString: e.target.value })}
          />
          <Button onClick={() => this._executeSearch()}>
            <i class="fas fa-search fa-2x" />
          </Button>
        </Wrapper>
        {this.state.posts.map((post, index) => (
            <Div>
            <Content>
          <H2>{post.title}</H2>
          <P>{post.content}</P>
          <Author>Posted By {post.author.name}</Author>
          </Content>
          <div>
          <ButtonDiv>
          <Button2>
        <Link to={`/post/${post.id}`}>
        Read More
        </Link>
        </Button2>
        </ButtonDiv>
          </div>
          </Div>
        ))}
      </Container>
    );
  }
}

export default withApollo(Search);
