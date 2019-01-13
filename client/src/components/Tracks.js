import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { CubeGrid } from "styled-spinkit";
const Container = styled.div`
  display: grid;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  overflow: hidden;
  margin-top: 55px;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 3px;
`;
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
      <Container>
        <Query query={TRACKS_QUERY}>
          {({ data, loading, error }) => {
            console.log(data, "DATA");
            if (loading)
              return <CubeGrid size={90} color={props => props.theme.red} />;
            if (error) return <h3>Error:`${error}` . . .</h3>;
            const tracks = data.tracks;
            console.log(tracks, "tracks");
            return tracks.map((track, index) => (
              <h2 key={index}>{track.name}</h2>
            ));
          }}
        </Query>
      </Container>
    );
  }
}

export default Tracks;
