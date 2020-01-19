import React from "react"
import Image from "gatsby-image"
import ReactDOM from 'react-dom'

class ShopBasket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalOpen: true,
        currentIndex: 0,
        firstImageLoad:true,
        height:300
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
    this.setFixedSpacing = this.setFixedSpacing.bind(this);
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

setFixedSpacing(e){
//  this.setState({height:200})
}

render() {
return (
  this.props.items!==undefined && this.props.items.length>0 &&
  <div style={{
    height: this.state.height + 'px'
  }}>
  <div style={{
    position:'fixed',
    textAlign:'center',
    width:'100%',
    bottom:0,
    zIndex:9,
    left:0,
    padding: '5px',
    background:'rgba(255,255,255,0.96)',
    borderTop: '1px solid black'
  }}
  onLoad={(e)=>this.setFixedSpacing(e)}>
    <h3 style={{margin:'0 0 5px 0',padding:'3px'}}>Checkout</h3>
    <ul style={{padding:0,margin:0}}>
   {this.props.items.map((x,i,arr)=>
   <li key={`bskt-item-${i}`} style={{display:'inline-list', listStyleType:'none'}}>
<button onClick={()=>{this.props.updateShopBasket(x.item,parseInt(x.quantity)-1)}}>-</button>
&nbsp;{x.quantity}&nbsp; 
<button onClick={()=>{this.props.updateShopBasket(x.item,parseInt(x.quantity)+1)}}
disabled={parseInt(x.item.stock)<=parseInt(x.quantity)}>+</button>
&nbsp;<strong>x</strong>&nbsp; 
{x.item.name} <strong>=</strong> £{(parseInt(x.item.price)/100)*parseInt(x.quantity)}
  </li>
  )} 
<li>Total: <strong>£{this.props.items.reduce((accum,y)=>accum+=((parseInt(y.item.price)/100)*parseInt(y.quantity)),0)}</strong></li>
  </ul>
  <p><small>Price include free international shipping. Please email eothenstearn@gmail.com with any queries.</small></p>
  <form method="post" action="https://www.paypal.com/cgi-bin/webscr">
    <input name="business" type="hidden" value="rlouis.alexander@gmail.com"/>
    <input name="cmd" type="hidden" value="_xclick"/>
    <input name="item_name" type="hidden" value={this.props.items.reduce((accum,x,i,arr)=>{
      return accum += `${x.quantity}x ${x.item.name} (£${parseInt(x.item.price)/100}) ~ `
    },``)}/>
    <input name="amount" type="hidden" value={this.props.items.reduce((accum,x,i,arr)=>{
      return accum += (parseInt(x.item.price)/100)*x.quantity
    },0)}/>
    <input name="currency_code" type="hidden" value="GBP"/>
    <input name="return" type="hidden" value="https://eothenstearn.com"/>
    <input type="image" name="submit" src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_buynow_107x26.png" alt="Buy Now"/>
    <img alt="" border="0" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"/>
    </form>
  </div>
  </div>
  )
}
}

export default ShopBasket



