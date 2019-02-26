import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const SINGLE_TRACK_QUERY = gql`
	query TrackQuery($id: ID!) {
		track(id: $id) {
			id
			name
		}
	}
`;
const SingleTrack = props => {
	return (
		<Query query={SINGLE_TRACK_QUERY} variables={{ id: props.match.params.id }}>
			{({ data, loading, error }) => {
				if (loading) return <p>Loading</p>;
				return <h2>{data.track.name}</h2>;
			}}
		</Query>
	);
};

export default SingleTrack;
