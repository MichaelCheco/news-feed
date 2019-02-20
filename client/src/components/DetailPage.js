import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { CubeGrid } from 'styled-spinkit';

const POST_QUERY = gql`
	query PostQuery($id: ID!) {
		post(id: $id) {
			id
			title
			content
			published
		}
	}
`;
class DetailPage extends Component {
	render() {
		return (
			<Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
				{({ data, loading, error }) => {
					if (error) return <h3>Error . . .</h3>;
					return (
						<div>
							{loading ? (
								<CubeGrid size={90} color={props => props.theme.red} />
							) : (
								<div>
									<h2>{data.post.title}</h2>
									<p>{data.post.content}</p>
								</div>
							)}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(DetailPage);
