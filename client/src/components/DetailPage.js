import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  overflow: scroll;
  grid-column: 2 / 7;
  grid-row: 3 / -1;
  margin-top: 30px;
  background: white;
  border: 1px solid grey;
  border-radius: 3px;
`;
const Div = styled.div`
    padding: 15px;
`;
const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
    }
  }
`
class DetailPage extends Component {
    render() { 
        return ( 
                <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
                    {({ data, loading, error}) => {
                        if (error) return <h3>Error . . .</h3>
                        return (
                            <Container>
                               {loading ? <h3>Loading . . .</h3> : <Div><h2>{data.post.title}</h2>
                                <p>{data.post.content}</p></Div>}
                            </Container>
                        )
                    }}
                </Query>
         );
    }
}
 
export default withRouter(DetailPage);