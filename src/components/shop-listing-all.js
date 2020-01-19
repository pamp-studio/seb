import React from "react"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import ShopListing from "../components/shop-listing"

export default (props) => (
  <StaticQuery
    query={graphql`query shopItemsQuery { site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM YYYY")
            title
            description
            tags
            shopItems {
              name
              id
              image { 
                childImageSharp {
                  fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                  }
                } 
              }
              stock
              price
            }
          }
        }
      }
    }}`}
    render={data => {
      const shopItems = data.allMarkdownRemark.edges
      .reduce((accum,x)=>accum=x.node.frontmatter.shopItems!==null ? 
      accum.concat(x.node.frontmatter.shopItems
        .map(z=>{z.slug=x.node.fields.slug; return z}))
      : accum,[])
      
      return (
      <ShopListing items={shopItems} updateShopBasket={props.updateShopBasket}/>
    )}}/>

)





