import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($searchString: String!) {
        filterPosts(searchString: $searchString) {
            id
            title
            content
            createdAt
            published
            author {
                name
            }
        }
    }
`

class Search extends Component {
    state = {
        posts: [],
        searchString: ''
      }
      _executeSearch = async () => {
          const { searchString } = this.state
          const result = await this.props.client.query({
              query: FEED_SEARCH_QUERY,
              variables: { searchString }
          })
          const posts = result.data.filterPosts
          this.setState({ posts})
      }
    render() { 
        return ( 
            <div>
                <h3>Search</h3>
                <input 
                type="text"
                onChange={e => this.setState({ searchString: e.target.value })}
                />
                <button onClick={() => this._executeSearch()}>Ok</button>
                {this.state.posts.map((post, index) => (
                    <Post 
                    key={post.id}
                    post={post}
                    index={index}
                    />
                ))}
            </div>
         );
    }
}
 
export default withApollo(Search);