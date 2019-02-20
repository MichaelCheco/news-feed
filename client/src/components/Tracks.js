import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CubeGrid } from 'styled-spinkit';

const TRACKS_QUERY = gql`
	query TRACKS_QUERY {
		tracks {
			name
		}
	}
`;

class Tracks extends Component {
	state = {};
	render() {
		return (
			<div>
				<div>
					<Query query={TRACKS_QUERY}>
						{({ data, loading, error }) => {
							console.log(data, 'DATA');
							if (loading)
								return <CubeGrid size={90} color={props => props.theme.red} />;
							if (error)
								return (
									<h3>
										Error:`$
										{error}` . . .
									</h3>
								);
							const tracks = data.tracks;
							console.log(tracks, 'tracks');
							return tracks.map((track, index) => (
								<h2 key={index}>{track.name}</h2>
							));
						}}
					</Query>
				</div>
			</div>
		);
	}
}

export default Tracks;
