import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { timeDifferenceForDate } from '../utils';

class Post extends Component {
	render() {
		const { title, content, createdAt } = this.props.post;
		return (
			<div>
				<div>
					<h2>{title}</h2>
					<p>{content}</p>
					<div>
						Posted By {this.props.post.author.name}{' '}
						{timeDifferenceForDate(createdAt)}
					</div>
				</div>
				<div>
					<button>
						<Link to={`/post/${this.props.post.id}`}>Read More</Link>
					</button>
				</div>
			</div>
		);
	}
}
export default withRouter(Post);
