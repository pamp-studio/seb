import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        selectedTags: [],
        projects: this.props.posts
    }
    this.pick = this.pick.bind(this);
  }

  componentDidMount(){
    this.setState({
      projects: window.localStorage.getItem('projectTags')!==null && JSON.parse(window.localStorage.getItem('projectTags')).length ? this.props.posts.filter(x=> JSON.parse(window.localStorage.getItem('projectTags')).some(t=>x.node.frontmatter.tags.includes(t))): this.props.posts,
      selectedTags: window.localStorage.getItem('projectTags')!==null  ? JSON.parse(window.localStorage.getItem('projectTags')) : [],
    })
  }

pick(tag){
    var newTagList = [];
if(tag===null){
      newTagList = [];
}
else if(this.state.selectedTags.indexOf(tag)===-1){
  newTagList.push(tag);
} else {
  newTagList = newTagList.filter(x=>x!=tag);
}

this.setState({
  projects: newTagList.length > 0 ? this.props.posts.filter(x=> newTagList.some(t=>x.node.frontmatter.tags.includes(t))): this.props.posts,
  selectedTags: newTagList,
},()=>{
  window.localStorage.setItem('projectTags', JSON.stringify(newTagList));
})

}
  render() {
    const selectedButtonStyle ={
      padding:'5px',
      margin:'3px',
      color:'red',
      textTransform:'capitalize',
      cursor:'pointer',
      textDecoration:'none',
      fontFamily:'sans-serif'
    }
    const buttonStyle={
      padding:'5px',
      margin:'3px',
      color:'black',
      textTransform:'capitalize',
      cursor:'pointer',
      fontFamily:'sans-serif'
    }
return (<section>
  <nav style={{textAlign:'left',marginBottom:'10px'}}>
    <button style={this.state.selectedTags.length===0?selectedButtonStyle:buttonStyle} onClick={()=>{this.pick(null)}}>
      Everything
      </button>| 
   {this.props.tags.map((x,i)=>{
      return (<button key={`tag-${i}`} style={this.state.selectedTags.includes(x)?selectedButtonStyle:buttonStyle} onClick={()=>this.pick(x)}>{x}</button>)
    })}
  </nav>
         <div
           style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'left',
            marginBottom: '30px',
           }}>
        {this.state.projects.map(({ node },i) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div style={{
              margin:'2px'
            }}
            key={`proj-${i}`}>
            <Link 
              style={{ 
                color: `blue`,
                textDecoration:'none',
                padding:'5px',
                display:'inline-block',
                border:'0px outset black',
                width:'160px',
              minWidth:'160px',
              minHeight: '100%',
              }}
              activeStyle={{
                border:'1px dotted purple',
                textDecoration:'none',
                color: 'purple'
              }}
            to={node.fields.slug}>
            <article 
            key={node.fields.slug}
            >
              <header>
                <h4
                  style={{
                    marginBottom: 0,
                    fontWeight:'normal',
                    textDecoration:'underline',
                    fontFamily:'serif'
                  }}
                >
                    {title}
                </h4>
                <small style={{
                  padding:0,
                  margin:0,
                  color:'black'
                  }}>{node.frontmatter.tags.join(', ')}<br/>{node.frontmatter.date}</small>
              </header>
     
            </article>
             </Link>
             </div>
          ) 
        })
       }</div></section>)
  }
}

export default function() {
  
  const data = useStaticQuery(graphql`query {
    site {
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
          }
        }
      }
    }
  }
  `)

const pageTitles = ["home","about"]
const posts = data.allMarkdownRemark.edges.filter(({node})=>{ return pageTitles.indexOf(node.frontmatter.title.toLowerCase())<0})
const tags = posts.filter(x=>x.node.frontmatter!==undefined).reduce((accum,x)=>{return accum.concat(x.node.frontmatter.tags)},[]).filter((x,i,arr)=>i===arr.indexOf(x)).sort();
return (
<Projects tags={tags} posts={posts}/>
  )
}




