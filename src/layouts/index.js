import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import styled, { css } from "react-emotion";

import Typography from "typography";
import { TypographyStyle, GoogleFont } from "react-typography";
// import usWebDesignStandardsTheme from "typography-theme-us-web-design-standards";
import fairyGatesTheme from "typography-theme-fairy-gates";
import "./index.css";

require("../prismjs/prism.css");

const typography = new Typography(fairyGatesTheme);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MongoDB Docs with Gatsby</title>
      <meta name="description" content="This is the site description." />
    </Helmet>
    <GoogleFont typography={typography} />
    <TypographyStyle typography={typography} />

    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
