import * as React from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

const IndexPage = ({ data }) => (
  <Layout>
    <Container className="d-flex">
      {data.travelLocation.edges.map(({ node }) => (
        <Row key={node.id} className="mb-4">
          <Col>
            <h3>{node.frontmatter.location}</h3>
            <Row>
              {node.frontmatter.featured_images.childrenImageSharp.map((imageNode, index) => {
                const image = getImage(imageNode.gatsbyImageData)
                return (
                  <Col xs={6} md={3} lg={8} key={index}>
                    <GatsbyImage
                      image={image}
                      alt={node.frontmatter.location}
                      className="img-fluid mb-3"
                    />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      ))}
    </Container>
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
query {
  fileInformation: allFile {
    edges {
      node {
        id
        base
        name
      }
    }
  }
  travelLocation: allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {          
          travel_dates
          location
          featured_images {
            childrenImageSharp {
              gatsbyImageData(aspectRatio: 1.5, width:600)
            }
          }
        }
      }
    }
  }
}
`
