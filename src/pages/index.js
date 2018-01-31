import React, { Component } from "react";
import Link from "gatsby-link";
import styled, { css } from "react-emotion";
import facepaint from "facepaint";
import YouTube from "react-youtube";
import SiamCard from "../components/SiamCard";
import { Card } from "semantic-ui-react";

const IndexPage = () => (
  <Container>
    <Header>
      <Title>MongoDB Stitch</Title>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <HeaderLink />
        <HeaderLink />
        <HeaderLink />
      </div>
    </Header>
    <Video>
      <YouTube
        className={css`
          margin: 65px 0 0 0;
        `}
        // videoId="noB98K6A0TY"
        videoId="RCrY3dMNjdg"
        opts={{
          height: "290",
          width: "560"
        }}
      />
    </Video>
    <Content itemsPerRow={3}>
      <SiamCard
        header="Access Data Directly from the Client"
        description="MongoDB Stitch allows you to access your data directly from the client without a REST API."
        learnMoreLink="/crud-1"
      />
      <SiamCard
        header="Secure Your Data"
        description="MongoDB Stitch protects your data by default. All requests run through the powerful rules engine to ensure that only authorized eyes see your most sensitive data."
        learnMoreLink="/rules-1"
      />
      <SiamCard
        header="Run Complex Cloud Functions"
      />
      <SiamCard
        header="Integrate Third Party Services"
      />
      <SiamCard
        header="Handle User Authentication"
      />
      <SiamCard
        header="Communicate with Webhooks"
      />
    </Content>
  </Container>
);
export default IndexPage;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;

  display: grid;
  grid-template-columns: [left-edge] 3fr [mid-point] 720px [right-edge];
  grid-template-rows: [top] 2fr [cards-top] 3fr [bottom];
  /* grid-gap: 20px; */

  grid-template-areas:
    "header  video"
    "content content";
`;

const Header = styled.div`
  grid-area: header;
  min-width: 600px;
  padding: 0 20px 20px 130px;
`;
const Video = styled.div`
  /* background-color: lightslategrey; */
  grid-area: video;
  padding: 20px 130px 20px 20px;
  margin: auto;
`;

const Content = styled(Card.Group)`
  /* background-color: slategrey; */
  grid-area: content;
  padding: 20px 130px 20px 130px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1em;
`;

const SiamLink = styled(Link)`
  /* background-color: white; */
  background-color: lightgrey;
  background-image: none;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  /* border: 1px solid black; */
`;

const HeaderLink = styled(Link)`
  /* background-color: white; */
  background-color: lightgrey;
  background-image: none;
  min-height: 80px;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  margin: 25px 0 0 0;
  /* border: 1px solid black; */
`;

const pseudo = facepaint([":first-child"]);

const Title = styled.h1`
  margin-top: 10px;
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
