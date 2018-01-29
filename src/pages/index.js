import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "react-emotion";

const IndexPage = () =>
  <Container>
    <Sidebar />
    <Navbar />
    <Content>
      <h1>MongoDB Stitch</h1>
      <p>
        Stitch makes it easy to query a MongoDB database from your client code, add authentication to an app, or call and respond to third-party services.
        <br />
        Follow the links below to learn about the powerful features Stitch offers.
      </p>
    </Content>
    <Siam>
      <SiamLink to="/crud-1">CRUD</SiamLink>
      <SiamLink to="/rules-1">Rules</SiamLink>
      <SiamLink to="/functions-1">Functions</SiamLink>

    </Siam>
  </Container>
export default IndexPage;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  
  display: grid;
  grid-template-columns: [left-edge] 1fr [content-start] 6fr [content-end];
  grid-template-rows: [top] 50px [nav-bottom] repeat(3, 1fr [row-edge]);
  /* grid-gap: 20px; */

  grid-template-areas:
    "header  header  header "
    "sidebar content ."
    "sidebar content ."
    "sidebar siam    ."
    "sidebar .       .";
`;
const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: lightgray;
`;
const Navbar = styled.div`
  grid-area: header;
  background-color: white;
  border-bottom: 1px solid lightgray;
`;
const Content = styled.div`
  /* background-color: lightblue; */
  grid-area: content;
  padding: 0 20px;
`;
const Siam = styled.div`
  /* background-color: lightcoral; */
  grid-area: siam;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 20px;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  line-height: 150px;
`;

const SiamLink = styled(Link)`
  background-color: white;
  background-image: none;
  width: 380px;
  height: 150px;
  margin: 0 30px;
  border-radius: 4px;
  border: 1px solid black;
`;

// const ContentArea = styled.div`
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-columns: 1fr 2fr;
//   grid-template-rows: 1fr 1fr;
//   grid-template-areas:
//     "tl tr"
//     "bl br";
// `;
// const Example = styled.div`
//   background-color: yellow;
//   grid-area: tl;
// `;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
