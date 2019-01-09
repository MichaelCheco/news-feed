import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from 'react-router'
import { timeDifferenceForDate } from '../utils'
const Container = styled.div`
  display: grid;
  background: white;
  grid-row: 3 / -1;

  margin: 20px;
  padding: 10px;
  display: flex;
  border: 1px solid lightgray;
`;
const H2 = styled.h2`
  color: black;
  height: 20px;
  /* font-family: 'Anaheim', sans-serif; */
  font-family: 'Thasadith', sans-serif;
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
margin-left: 10px;
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
 class Post extends Component {
  render() {
      const { title, content, createdAt } = this.props.post
    console.log(this.props, "cccccc");
    return (
      <Container>
          <Content>
            <H2>{title}</H2>
            <P>{content}</P>
            <Author>Posted By {this.props.post.author.name} {timeDifferenceForDate(createdAt)}</Author>
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
export default withRouter(Post)