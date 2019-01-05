import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Post extends Component {
    render() {
        console.log(this.props, 'cccccc' )
        return (
            <Link to={`/post/${this.props.post.id}`}>
            <h2>{this.props.post.title}</h2>
            <p>{this.props.post.content}</p>
            </Link>
        );
    }
}