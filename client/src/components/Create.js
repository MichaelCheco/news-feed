import React, { PureComponent } from 'react';
import { withApollo, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { POSTS_QUERY } from './Posts';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { POSTS_PER_PAGE } from '../constants';

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
		title: '',
		content: '',
	};
	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	render() {
		const { title, content } = this.state;
		return (
			<Mutation
				mutation={CREATE_POST_MUTATION}
				variables={{ title, content }}
				onCompleted={() => this.props.history.push('/new/1')}
				update={(store, { data: { post } }) => {
					const first = POSTS_PER_PAGE;
					const skip = 0;
					const data = store.readQuery({
						query: POSTS_QUERY,
						variables: { first, skip },
					});
					data.feed.unshift(post);
					store.writeQuery({
						query: POSTS_QUERY,
						data,
						variables: { first, skip },
					});
				}}>
				{(createPost, { data, loading, error }) => {
					return (
						<div>
							<form
								onSubmit={async e => {
									e.preventDefault();
									const { title, content } = this.state;
									await createPost({
										variables: { title, content },
									});
									this.props.history.push('/');
								}}>
								<div>
									<input
										autoFocus
										name="title"
										value={this.state.title}
										placeholder="Title"
										onChange={this.handleChange}
									/>
									<textarea
										cols="10"
										rows="20"
										required
										placeholder="Content"
										name="content"
										value={this.state.content}
										onChange={this.handleChange}
									/>
									<button>Create</button>
								</div>
							</form>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default withApollo(withRouter(Create));
