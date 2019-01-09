import React, { PureComponent } from "react";
import { withApollo, Mutation } from "react-apollo";
import { withRouter } from 'react-router'
import { POSTS_QUERY } from './Posts'
import gql from "graphql-tag";
import styled from "styled-components";
import { POSTS_PER_PAGE } from "../constants";
const Container = styled.div`
  display: grid;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  margin-top: 30px;
  background: white;
  border: 1px solid grey;
  border-radius: 3px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Textarea = styled.textarea`
  border: 1px solid lightgrey;
  margin-top: 20px;
  width: 90%;
  font-size: 20px;
  margin-left: 15px;
  :focus {
    outline: 0;
  }
`;
const Button = styled.button`
  margin-top: 10px;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 24px;
  width: 200px;
  height: 50px;
  background: ${props => props.theme.mediumBlue};
  color: white;
  padding: 5px;
  cursor: pointer;
  :hover {
      background: #03669997;
  }
  :focus {
    outline: 0;
  }
`;
const Input = styled.input`
  width: 90%;
  margin-left: 15px;
  margin-top: 35px;
  height: 50px;
  font-size: 20px;
  :focus {
    outline: 0;
  }
`;
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      published
      author {
        name
      }
    }
  }
`;

class Create extends PureComponent {
  state = {
    title: "",
    content: ""
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    const { title, content } = this.state;
    return (
      <Mutation mutation={CREATE_POST_MUTATION}
      variables={{ title, content }}
      onCompleted={() => this.props.history.push('/new/1')}
      update={(store, { data: { post } }) => {
        const first = POSTS_PER_PAGE
        const skip = 0
        const data = store.readQuery({
          query: POSTS_QUERY,
        variables: { first, skip}
        })
        data.feed.unshift(post)
        store.writeQuery({
          query: POSTS_QUERY,
          data,
          variables: { first, skip }
        })
      }}
      >
        {(createPost, { data, loading, error }) => {
          return (
            <Container>
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  const { title, content } = this.state;
                  await createPost({
                    variables: { title, content }
                  });
                  this.props.history.push('/')
                }}
              >
                <InputWrapper>
                  <Input
                    autoFocus
                    name="title"
                    value={this.state.title}
                    placeholder="Title"
                    onChange={this.handleChange}
                  />
                  <Textarea
                    cols="10"
                    rows="20"
                    required
                    placeholder="Content"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                  <Button>Create</Button>
                </InputWrapper>
              </form>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default withApollo(withRouter(Create));
