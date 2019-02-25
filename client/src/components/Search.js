import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';

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
const SearchWrapper = styled.div`
	display: flex;
	width: 100%;

	input {
		width: 50%;
		font-size: 1.5rem;
		:focus {
			outline: 0;
		}
	}
`;
const PostButton = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: 80px;
		height: 30px;
		border-radius: 5px;
		margin-left: 0.5rem;
		background: ${props => props.theme.mediumBlue};
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
const Button = styled.button`
	background: ${props => props.theme.mediumBlue};
	color: white;
	padding: 0.5rem;
	margin-left: 0.5rem;
	cursor: pointer;
	:focus {
		outline: 0;
	}
`;
const Wrapper = styled.div`
	width: 100%;
	padding: 1rem;
`;
const Div = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
function trimPost(post) {
	var string = post;
	var length = 165;
	var trimmedString = string.substring(0, length) + '...';
	return trimmedString;
}
class Search extends Component {
	state = {
		posts: [],
		searchString: '',
	};
	_executeSearch = async () => {
		const { searchString } = this.state;
		const result = await this.props.client.query({
			query: FEED_SEARCH_QUERY,
			variables: { searchString },
		});
		const posts = result.data.filterPosts;
		this.setState({ posts });
	};
	render() {
		return (
			<Wrapper>
				<SearchWrapper>
					<input
						type="text"
						placeholder="Search"
						onChange={e => this.setState({ searchString: e.target.value })}
					/>
					<Button onClick={() => this._executeSearch()}>
						<i class="fas fa-search fa-2x" />
					</Button>
				</SearchWrapper>
				{this.state.posts.map((post, index) => (
					<div>
						<h2>{post.title}</h2>
						<p>{trimPost(post.content)}</p>
						<Div>
							<p>Posted By {post.author.name}</p>
							<div>
								<PostButton>
									<Link to={`/post/${post.id}`}>Read More</Link>
								</PostButton>
							</div>
						</Div>
					</div>
				))}
			</Wrapper>
		);
	}
}

export default withApollo(Search);
