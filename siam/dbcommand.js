import React from "react";
import Link from "gatsby-link";
import styled, { css } from "react-emotion";
// import Codeblock from "react-uikit-codeblock";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";

const PrototypeCard = props => (
  <PrototypeCardContainer optional={props.value.optional}>
    <PrototypeCardInfoSection>
      <h4>{props.fieldName}</h4>
      <h6>{props.value.optional ? "Optional" : ""}</h6>
      <h5>{`Type: ${props.value.type}`}</h5>
    </PrototypeCardInfoSection>
    <PrototypeCardDescriptionSection>
      {props.description.split("\n").map(p => <p>{p}</p>)}
    </PrototypeCardDescriptionSection>
  </PrototypeCardContainer>
);

const PrototypeCardContainer = styled.div`
  /* color: ${props => (props.optional ? "blue" : "red")}; */
  border-bottom: 1px solid black;
  /* width: 800px; */
  display: flex;
  flex-direction: row;
`;

const PrototypeCardInfoSection = styled.div`
  width: 380px;
  padding: 10px;
`;
const PrototypeCardDescriptionSection = styled.div`
  width: 100%;
  flex-grow: 1;
  color: black;
  padding: 10px;
`;

const Header = styled.h1`
  /* width: 100%; */
  /* height: 100px; */
  line-height: 100px;
  background-color: lightgray;
  margin: 0;
`;

const JsonPrototype = props => {
  const formattedString = `
  db.runCommand({
    ${props.arguments
      .map(arg => `${arg.fieldName}: ${arg.value.text}`)
      .join(",\n    ")}
  })`;

  return <div />

  // return (
  //   <Codeblock>
  //     <SyntaxHighlighter language="text" style={docco}>
  //       {formattedString}
  //     </SyntaxHighlighter>
  //   </Codeblock>
  // );
};

const Sidebar = styled.aside`
  min-width: 350px;
  max-width: 350px;
  border-right: 1px solid black;
  flex-grow: 0;
`;

const MainContent = styled.div`
  min-width: 960px;
  max-width: 960px;
  flex-grow: 1;
  margin-right: auto;
  border-right: 1px solid black;
`;

const DbCommand = ({ data }) => {
  const dbcommand = data.dbcommandsYaml;
  console.log('asdfasdf', dbcommand.prototype)

  return (
    <div>
      <Header>Command: {dbcommand.name}</Header>
      <div
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Sidebar>This is the sidebar!</Sidebar>
        <MainContent>
          <JsonPrototype arguments={dbcommand.prototype} />
          {dbcommand.prototype.map(arg => (
            <PrototypeCard
              key={arg.fieldName}
              fieldName={arg.fieldName}
              value={arg.value}
              description={arg.description}
            />
          ))}
        </MainContent>
      </div>
    </div>
  );
};
export default DbCommand;

export const query = graphql`
  query DbCommandQuery {
    dbcommandsYaml {
      name
      prototype {
        fieldName
        value {
          text
          type
          numArgs
          optional
        }
        description
      }
    }
  }
`;
