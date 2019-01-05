import React, { Component } from "react";
import { withApollo, Mutation } from "react-apollo";
import gql from "graphql-tag";

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

class Create extends Component {
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
            <div>
                <form onSubmit={async e => {
                    console.log('CREATE',  CREATE_POST_MUTATION)
                    e.preventDefault()
                    const { title, content } = this.state;
                    await createPost({
                        variables: { title, content}
                    })
                    }}>
              <h1>Create Post</h1>
              <input
                autoFocus
                name="title"
                value={this.state.title}
                placeholder="Title"
                onChange={this.handleChange}
              />
              <textarea
                cols={50}
                rows={0}
                placeholder="Content"
                name="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
              <button>Create</button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withApollo(Create);
