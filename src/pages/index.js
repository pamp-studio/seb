import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const post = this.props.data.markdownRemark
    const pageTitles = ["home","about"]

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* <ShopListingAll updateShopBasket={this.props.updateShopBasket}/> */}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
query{
  site {
    siteMetadata {
      title
    }
  }
  markdownRemark(frontmatter: { title: { eq: "Home" } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
    }
  }
}
`


