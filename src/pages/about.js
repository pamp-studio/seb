import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const post = this.props.data.markdownRemark

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" />
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
query{
  site {
    siteMetadata {
      title
    }
  }
  markdownRemark(frontmatter: { title: { eq: "About" } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
    }
  }
}
`
