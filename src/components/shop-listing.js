import React from "react"
import Image from "gatsby-image"
import {Link } from "gatsby"

class ShopListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalOpen: true,
        currentIndex: 0,
        firstImageLoad:true
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
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
  this.props.items!==undefined &&
  this.props.items!==null && 
  <div>
  <div style={{
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    margin: '30px 0px'
  }}>
   {this.props.items.filter(x=>x!=null).map((x,i)=>
   <div
   key={`shopitem-${i}`}
   >
   <Link to={x.slug!==undefined?x.slug:''}
       onClick={(e)=>{if(x.slug==undefined){e.preventDefault()}}}
       style={{cursor:'default'}}
       >
  <Image
    key={i}
    fixed={x.image.childImageSharp.fixed}
    alt={x.name}
    style={{
      border:  'none',
      background: i==this.state.currentIndex?'none' : 'none',
    }}
    imgStyle={{
        padding:'1px',
        margin:0
    }}
  /></Link>
  <h6>{x.name}</h6>
  <em>£{parseInt(x.price)/100}</em> | <button onClick={()=>this.props.updateShopBasket(x,1)}>Purchase</button>
  </div>
  )} </div>
  </div>
  )
}
}

export default ShopListing



