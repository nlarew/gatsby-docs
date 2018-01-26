import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled, { css } from "react-emotion";


import Typography from "typography";
import { TypographyStyle, GoogleFont } from "react-typography";
import usWebDesignStandardsTheme from "typography-theme-us-web-design-standards";
import fairyGatesTheme from 'typography-theme-fairy-gates';

require("../prismjs/prism.css");

const typography = new Typography(fairyGatesTheme);
// const typography = new Typography(funstonTheme);

import "./index.css";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MongoDB Docs with Gatsby</title>
      <meta name="description" content="This is the site description." />
      <GoogleFont typography={typography} />
    </Helmet>
    <TypographyStyle typography={typography} />

    <Content>{children()}</Content>
  </div>
);

const Content = styled.div`
  height: 100vh;
  width: auto;
  max-width: 2000px;
  margin: 0 auto;
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
