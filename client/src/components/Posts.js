import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';
import { POSTS_PER_PAGE } from '../constants';
import { CubeGrid } from 'styled-spinkit';
import styled from 'styled-components';
const PaginationStyles = styled.div`
	@media (min-width: 375px) {
		display: flex;
		justify-content: flex-end;
		margin-top: 5rem;
	}
	button {
		text-align: center;
		border-radius: 4px;
		height: 25px;
		width: 75px;
		margin: 0.4rem;
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
		const isNewPage = this.props.location.pathname.includes('new');
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
		const isNewPage = this.props.location.pathname.includes('new');
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
					__typename: prev.feed.__typename,
				});
			},
		});
	};
	render() {
		return (
			<div>
				<Query query={POSTS_QUERY} variables={this._getQueryVariables()}>
					{({ loading, error, data, subscribeToMore, refetch }) => {
						if (loading)
							return <CubeGrid size={90} color={props => props.theme.red} />;
						if (error)
							return (
								<h3>
									Error:`$
									{error}` . . .
								</h3>
							);
						this._subscribeToNewPosts(subscribeToMore);
						const posts = this._getPostsToRender(data);
						const isNewPage = this.props.location.pathname.includes('new');
						const pageIndex = this.props.match.params.page
							? (this.props.match.params.page - 1) * POSTS_PER_PAGE
							: 0;
						return (
							<div>
								{isNewPage && (
									<PaginationStyles>
										<button onClick={this._previousPage}>← Previous</button>
										<button onClick={() => this._nextPage(data)}>Next →</button>
									</PaginationStyles>
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
			</div>
		);
	}
}

export default Posts;
