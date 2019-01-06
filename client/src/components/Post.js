import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  background: white;
  margin: 20px;
  padding: 10px;
  display: flex;
  border: 1px solid lightgray;
`;
const H2 = styled.h2`
  color: black;
  height: 20px;
`;
const Author = styled.p`
    font-style: italic;
    font-size: 12px;
    text-decoration: underline;
`;
const P = styled.p`
  color: black;
  height: 80px;
  overflow: hidden;
  font-size: 14px;
`;
const Content = styled.div`
  width: 70%;
  height: 200px;
  overflow: hidden;
`;
const Button = styled.div`
    width: 150px;
    height: 55px;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    padding: 9px;
    background: ${props => props.theme.darkBlue};
    :hover {
        cursor: pointer;
        background: #00446698;
    }
    a {
        color: white;
        text-align: center;
    }
`;
const ButtonDiv = styled.div`
    width: 30%;
    justify-content: center;
    align-items: center;
    display: flex;
`;
export default class Post extends Component {
  render() {
      const { title, content } = this.props.post
    console.log(this.props, "cccccc");
    return (
      <Container>
          <Content>
            <H2>{title}</H2>
            <P>{content}</P>
            <Author>Posted By {this.props.post.author.name}</Author>
          </Content>
          <ButtonDiv>
          <Button>
        <Link to={`/post/${this.props.post.id}`}>
        Read More
        </Link>
        </Button>
        </ButtonDiv>
      </Container>
    );
  }
}
