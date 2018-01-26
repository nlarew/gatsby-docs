import React from "react";
import Link from "gatsby-link";
import styled, { css } from "react-emotion";
import Codepen from '../components/codepen';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`

const Column = styled.div`
  height: 100%;
  width: 1250px;
  margin: 10px 0 0 10px;
`

const Siam = (data) => {
  const siam = data.pathContext;

  console.log('siamobject', siam)

  return (
    <Container>
      <Column className={css`overflow-y: scroll;`}>
        <div dangerouslySetInnerHTML={{ __html: siam.html }} />
      </Column>
      <Column className={css`width: 1600px;`}>
        { siam.codepen
          ? <Codepen {...siam.codepen} />
          : ""
        }
      </Column>
    </Container>
  );

};
export default Siam;
