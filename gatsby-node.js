const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // const dbcommandTemplate = path.resolve(`src/template/dbcommand.js`);
    const dbcommandTemplate = path.resolve(`src/template/dbcommand.js`);
    const siamTemplate = path.resolve(`src/template/siam.js`);
    resolve(graphql(`
        {
          allDbcommandsYaml {
            edges {
              node {
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
          }
          allMarkdownRemark {
            edges {
              node {
                html
                frontmatter {
                  title
                  codepen {
                    title
                    user
                    hash
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create dbcommand pages.
        result.data.allDbcommandsYaml.edges.forEach(edge => {
          createPage({
            path: `${edge.node.name}`, // required
            // component: `/${dbcommandTemplate}`,
            component: dbcommandTemplate,
            context: {
              name: edge.node.name,
              prototype: edge.node.prototype
            }
          });
        });

        // Create SIAM pages.
        const nodes = result.data.allMarkdownRemark.edges.map(e => e.node);
        nodes.forEach(node => {
          createPage({
            path: `${node.frontmatter.title}`, // required
            component: siamTemplate,
            context: {
              title: node.frontmatter.title,
              html: node.html,
              codepen: node.frontmatter.codepen,
            }
          });
        });

        return;
      }));
  });
};
