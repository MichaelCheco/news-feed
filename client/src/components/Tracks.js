import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CubeGrid } from 'styled-spinkit';
const Wrapper = styled.div`
	border: 1px solid lightgray;
	display: flex;

	flex-direction: column;
`;
const TRACKS_QUERY = gql`
	query TRACKS_QUERY {
		tracks {
			id
			name
		}
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
const Track = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 1rem;
`;
class Tracks extends Component {
	state = {};
	render() {
		return (
			<Wrapper>
				<Query query={TRACKS_QUERY}>
					{({ data, loading, error }) => {
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
						return tracks.map((track, index) => (
							<Track>
								<h2 key={index}>{track.name}</h2>
								<p>{track.id}</p>
								<Button>
									<a>Learn More</a>
								</Button>
							</Track>
						));
					}}
				</Query>
			</Wrapper>
		);
	}
}

export default Tracks;
