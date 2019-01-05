import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
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
                        if (loading) return <h3>Loading . . .</h3>
                        if (error) return <h3>Error . . .</h3>
                        console.log(data, 'DATAAAA', this.props.match.params.id)
                        return (
                            <Fragment>
                                <h2>{data.post.title}</h2>
                                <p>{data.post.content}</p>
                            </Fragment>
                        )
                    }}
                </Query>
         );
    }
}
 
export default withRouter(DetailPage);