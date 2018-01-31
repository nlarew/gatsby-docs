import React from "react";
import { navigateTo } from "gatsby-link";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const SiamCard = props => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{props.header}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        {props.learnMoreLink ? (
          <Button
            fluid
            size="mini"
            basic
            color="green"
            onClick={() => navigateTo(props.learnMoreLink)}
          >
            Learn More
          </Button>
        ) : (
          ""
        )}
        {props.documentationLink ? (
          <Button
            fluid
            size="mini"
            basic
            color="grey"
            onClick={() => navigateTo(props.documentationLink)}
          >
            Documentation
          </Button>
        ) : (
          ""
        )}
      </Button.Group>
    </Card.Content>
  </Card>
);

export default SiamCard;
