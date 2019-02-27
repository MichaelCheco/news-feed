import React, { PureComponent } from 'react';
import { withApollo, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { POSTS_QUERY } from './Posts';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { POSTS_PER_PAGE } from '../constants';
const Wrapper = styled.div`
	@media (min-width: 375px) {
		/* border: 1px solid red;
		display: flex;
		flex-direction: column; */
	}
`;
const InputWrapper = styled.div`
	@media (min-width: 375px) {
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
	}
`;
const Input = styled.input`
	@media (min-width: 375px) {
		width: 90%;
		margin-left: 1.8rem;
		height: 3rem;
		font-size: 1.5rem;
		:focus {
			outline: 0;
		}
	}
`;
const Textarea = styled.textarea`
	@media (min-width: 375px) {
		border: 1px solid lightgrey;
		margin-top: 20px;
		width: 90%;
		font-size: 1.5rem;
		margin-left: 1.8rem;
		resize: none;
		:focus {
			outline: 0;
		}
	}
`;
const Button = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: 90%;
		align-self: center;
		height: 30px;
		border-radius: 2px;
		margin: 1rem 0;
		background: ${props => props.theme.mediumBlue};
		/* position: relative;
		top: 70%;
		right: 90%; */

		&:hover {
			cursor: pointer;
			opacity: 0.7;
		}
		outline: 0;
		a {
			font-size: 1.3rem;
			white-space: nowrap;
			color: white;
		}
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
						<Wrapper>
							<form
								onSubmit={async e => {
									e.preventDefault();
									const { title, content } = this.state;
									await createPost({
										variables: { title, content },
									});
									this.props.history.push('/');
								}}>
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
									<Button>
										<a>Create</a>
									</Button>
								</InputWrapper>
							</form>
						</Wrapper>
					);
				}}
			</Mutation>
		);
	}
}

export default withApollo(withRouter(Create));
