import React from "react";
import Link from "gatsby-link";
import styled, { css } from "react-emotion";
import Codepen from '../components/codepen';

const Siam = (data) => {
  const siam = data.pathContext;

  console.log('siam', siam)

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: siam.html }} />
      { siam.codepen
        ? <Codepen {...siam.codepen} />
        : ""
      }
    </div>
  );

};
export default Siam;
