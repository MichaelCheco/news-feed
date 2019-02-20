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
			<div>
				<div>
					<input
						type="text"
						placeholder="Search"
						onChange={e => this.setState({ searchString: e.target.value })}
					/>
					<button onClick={() => this._executeSearch()}>
						<i class="fas fa-search fa-2x" />
					</button>
				</div>
				{this.state.posts.map((post, index) => (
					<div>
						<div>
							<h2>{post.title}</h2>
							<p>{post.content}</p>
							<div>Posted By {post.author.name}</div>
						</div>
						<div>
							<div>
								<button>
									<Link to={`/post/${post.id}`}>Read More</Link>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default withApollo(Search);
