import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { timeDifferenceForDate } from '../utils';
const PostWrapper = styled.div`
	@media (min-width: 375px) {
		border: 3px solid yellow;
	}
`;
function trimPost(post) {
	var string = post;
	var length = 150;
	var trimmedString = string.substring(0, length) + '...';
	return trimmedString;
}
const Button = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: 85px;
		height: 35px;
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
class Post extends Component {
	render() {
		const { title, content, createdAt } = this.props.post;
		return (
			<PostWrapper>
				<div>
					<h2>{title}</h2>
					<p>{trimPost(content)}</p>
					<Link to={`/post/${this.props.post.id}`}>
						<Button>
							<a>Read More</a>
						</Button>
					</Link>
					<p>
						Posted By {this.props.post.author.name}{' '}
						{timeDifferenceForDate(createdAt)}
					</p>
				</div>
			</PostWrapper>
		);
	}
}
export default withRouter(Post);
