import React, { Component, PureComponent } from "react";
import { withApollo, Mutation } from "react-apollo";
import { withRouter } from 'react-router'
import gql from "graphql-tag";
import styled from "styled-components";
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
  margin-left: 18px;
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
const H1 = styled.h1`
  margin-left: 17px;
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
const Input = styled.input`
  width: 90%;
  margin-left: 15px;
  height: 50px;
  font-size: 20px;
  :focus {
    outline: 0;
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
    return (
      <Mutation mutation={CREATE_POST_MUTATION}>
        {(createPost, { data, loading, error }) => {
          return (
            <Container>
              <form
                onSubmit={async e => {
                  console.log("CREATE", CREATE_POST_MUTATION);
                  e.preventDefault();
                  const { title, content } = this.state;
                  await createPost({
                    variables: { title, content }
                  });
                  this.props.history.push('/')
                }}
              >
                <H1>Create Post</H1>
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
