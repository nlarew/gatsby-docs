import React from 'react';
// import Codepen from "react-codepen";
import Iframe from 'react-Iframe';
import styled, { css } from 'react-emotion'


// const FrameContainer = styled.div`
//   width: 1200px;
// `

const Codepen = props => (
  <Iframe
    height="800"
    width="1600"
    scrolling="no"
    title={props.title}
    url={`//codepen.io/${props.user}/embed/${props.hash}/?height=800&theme-id=dark&default-tab=js,result&embed-version=2`}
    frameborder="no"
    allowtransparency="true"
    allowfullscreen="true"
  >
    See the Pen <a href={`https://codepen.io/${props.user}/pen/${props.hash}/`}>{props.title}</a>{" "}
    by Nick Larew (<a href={`https://codepen.io/${props.user}`}>@{props.user}</a>) on{" "}
    <a href="https://codepen.io">CodePen</a>.
  </Iframe>
);
export default Codepen