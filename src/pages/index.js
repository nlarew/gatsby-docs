import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "react-emotion";

export default class IndexPage extends Component {
  state = { helloMessage: "Hello Gatsby!" };
  render = () => (
    <div>
      <Link to="/dbcommand/">dbcommand: `aggregate`</Link>
      <Link to="/mymark/">
        <Block>Fluxwaggle</Block>
      </Link>
      <Link to="/page-2/">
        <Block>{this.state.helloMessage}</Block>
      </Link>
    </div>
  );
}

const Block = styled.div`
  background: red;
  width: 300px;
  height: 250px;
`;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
