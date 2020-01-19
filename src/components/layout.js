import React from "react"
import { Link } from "gatsby"
import Header from "./header"
import Projects from "../components/projects"
import { rhythm, scale } from "../utils/typography"
import ShopBasket from "../components/shop-basket"
import ShopListingAll from "../components/shop-listing-all"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        shopBasket: []
    }
    this.updateShopBasket = this.updateShopBasket.bind(this);
  }
  componentDidMount(){
    this.setState({
      shopBasket: window.localStorage.getItem('shopBasket')!==undefined && window.localStorage.getItem('shopBasket')!==null ? 
        JSON.parse(window.localStorage.getItem('shopBasket')) : []
    })
  }

 updateShopBasket(item,quantity){
    var basket = this.state.shopBasket;
    var existingItemIndex = -1;
    basket.forEach((x,i)=>{
      if(x.item.id===item.id){
        existingItemIndex = i;
      }
  })
    if(existingItemIndex!==-1 && quantity>0){
      basket[existingItemIndex].quantity = quantity;
    }
    else if(quantity>0){
      basket.push({item:item,quantity:quantity})
    }
    else {
      basket.splice(existingItemIndex,1);
    }
    this.setState(() => ({
      shopBasket: basket,
  }),()=>{
     window.localStorage.setItem('shopBasket', JSON.stringify(basket));
  }
  )
  }  
  
  render() {
    const { location, title, children } = this.props
    const childrenWithProps = React.Children.map(children, (child, i) =>
    React.cloneElement(child, { updateShopBasket: this.updateShopBasket })
  );
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1 style={{marginBottom:0}}>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h2 style={{marginBottom:0}}>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h2>
      )
    }
    return (
      <div>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(44),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
        {header}         
        </header>
        <main>{childrenWithProps}</main>
        <Projects />
        {location.pathname === rootPath && <div><hr/><ShopListingAll updateShopBasket={this.updateShopBasket}/></div>}

        {/* <audio style={{display:'block'}} controls src="https://itsticks.github.io/tarantula/mixes/20190706/a7 dont quit me.mp3">
 <source src="https://itsticks.github.io/tarantula/mixes/20190706/a7 dont quit me.mp3" type="audio/mpeg"/>
Your browser does not support the audio element.
</audio> */}
        <footer>
        <Header />
        Ⓐ Sebastian Ymai {new Date().getFullYear()}
        </footer>
      </div>
      <ShopBasket items={this.state.shopBasket} updateShopBasket={this.updateShopBasket}/>
      </div>
    )
  }
}

export default Layout