import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../constants'


  const SIGNUP_MUTATION = gql`
    mutation signup($email: String!, $password: String!, $name: String!) {
        signup(
            email: $email,
            password: $password
            name: $name
        )
        {
            token
        }
    }
  `

const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!) {
    login(
        email: $email,
        password: $password
    )
    {
        token
    }
}
`