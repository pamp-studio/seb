import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Header = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            instagram
          }
          contact {
            email
          }
        }
      }
    }
  `)

  const { author, social, contact } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `block`,
        marginBottom: rhythm(.5),
      }}
    >
      <p
      style={{
        marginBottom:0,
        width: 'fit-content'
      }}>
       Spent the past 7 years in and out of the Glasgow School of Art until summer 2016.
&nbsp;<Link 
    style={{color:'blue',textDecorationColor: 'blue',}} 
    to='/about/'>Read more...</Link>&nbsp;</p>
    <p style={{color:'blue'}}>
        {` `}
         <a style={{color:'blue',textDecoration:'underline',
                textDecorationColor: 'blue'}} href={`mailto://${contact.email}`}> 
        {contact.email}
         </a></p> 
       
      
    </div>
  )
}

export default Header
