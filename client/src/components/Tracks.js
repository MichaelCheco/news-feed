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
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const H2 = styled.h2`
  font-family: "Thasadith", sans-serif;
  font-size: 21px;
  font-weight: bold;
`;
class Tracks extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Wrapper>
          <Query query={TRACKS_QUERY}>
            {({ data, loading, error }) => {
              console.log(data, "DATA");
              if (loading)
                return <CubeGrid size={90} color={props => props.theme.red} />;
              if (error) return <h3>Error:`${error}` . . .</h3>;
              const tracks = data.tracks;
              console.log(tracks, "tracks");
              return tracks.map((track, index) => (
                  <H2 key={index}>{track.name}</H2>
              ));
            }}
          </Query>
        </Wrapper>
      </Container>
    );
  }
}

export default Tracks;
