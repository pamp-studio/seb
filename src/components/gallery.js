import React from "react"
import Image from "gatsby-image"
import ReactDOM from 'react-dom'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalOpen: true,
        currentIndex: 0,
        firstImageLoad:true
    }
    this.imageLoaded = this.imageLoaded.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
  }

  imageLoaded(){
    let _this = ReactDOM.findDOMNode(this);
    if(!this.state.firstImageLoad){
    window.scrollTo(0,_this.offsetTop-10);
  }else{
  this.setState({firstImageLoad:false});
}
  }

openModal(i){
  this.setState({
    modalOpen:true,
    currentIndex:i
  },)
}

closeModal(){
  this.setState({
    modalOpen:false
  })
}

      nextItem(e){
        e.stopPropagation();
        let lastI = this.props.images.length-1;
        let next =  (this.state.currentIndex!==lastI) ? this.state.currentIndex+1 : 0;
        this.setState({
          currentIndex:next
        })
        return false;
      }

      prevItem(e){
        e.stopPropagation();
        let prev =  (this.state.currentIndex!==0) ? this.state.currentIndex-1 : this.props.images.length-1;
        this.setState({
          currentIndex:prev
        })
        return false;
      }

  render() {
return (
  this.props.images!==null && 
  <div>
    <div>
      <div
      id={'display'}
      onClick={this.nextItem}
      style={{
        
      }}
      >
     <Image
     onLoad={this.imageLoaded}
    sizes={this.props.images[this.state.currentIndex].childImageSharp.sizes}
    alt={''}
    style={{
      maxHeight:'95vh',
      width:'inherit',
      textAlign:'center',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      cursor:'pointer'
    }}
    imgStyle={{
      maxHeight:'95vh',
      width:'inherit',
    }}
  />
  <p>{`${this.state.currentIndex+1} of ${this.props.images.length}`}</p>
  <button onClick={this.prevItem} style={{cursor:'pointer'}}>Previous</button>|
      <button onClick={this.nextItem} style={{cursor:'pointer'}}>Next</button>
  </div>
      
  </div>
  <div style={{
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    margin: '30px 0px'
  }}>
   {this.props.images.map((x,i)=>
   <div
   key={`galimg-${i}`}
   onClick={()=>{this.openModal(i)}}
   >
    <Image
    key={i}
    fixed={x.childImageSharp.fixed}
    alt={'eothen stearn'}
    style={{
      cursor:'pointer',
      border: i==this.state.currentIndex?'2px dotted red' : 'none',
      background: i==this.state.currentIndex?'none' : 'none',

    }}
    imgStyle={{
        padding:'1px',
        margin:0
    }}
  />
  </div>
  )} </div>
  </div>
  )
}
}

export default Gallery



