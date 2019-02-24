import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { timeDifferenceForDate } from '../utils';
const PostWrapper = styled.div`
	@media (min-width: 375px) {
	}
`;
function trimPost(post) {
	var string = post;
	var length = 165;
	var trimmedString = string.substring(0, length) + '...';
	return trimmedString;
}
const More = styled.div`
	@media (min-width: 375px) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
const Button = styled.button`
	@media (min-width: 375px) {
		border: 1px solid ${props => props.theme.mediumBlue};
		width: 80px;
		height: 30px;
		border-radius: 5px;
		margin-left: 0.5rem;
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
class Post extends Component {
	render() {
		const { title, content, createdAt } = this.props.post;
		return (
			<PostWrapper>
				<div>
					<h2>{title}</h2>
					<More>
						<p>{trimPost(content)}</p>
						<Link to={`/post/${this.props.post.id}`}>
							<Button>
								<a>Read More</a>
							</Button>
						</Link>
					</More>
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
