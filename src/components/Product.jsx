import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../Context'
import NoImg from './img/NoImage.png'
import {ProductWrapper} from './StyledComponents'


export default class Product extends Component {
  render() {
    const {id, productName, imageUrl, price, inCart} = this.props.product;

    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
            <ProductConsumer>
                { value =>
                    <div className="img-container p-5" onClick={() => value.handleDetail(id) }>
                        <Link to="/details">
                            <img src={imageUrl === '' ? NoImg : imageUrl } alt="product" className="card-img-top img-fluid"/>
                        </Link>

                        <button className="cart-btn" disabled={inCart} onClick={ () => {value.addToCart(id)} }>
                            {inCart
                                ? <p className="text-capitalize mb-0" disabled> In Cart</p>
                                : <i className="fas fa-cart-plus"> </i>
                            }
                        </button>
                    </div>
                }
            </ProductConsumer>

          {/*Card footer*/}
          <div className='card-footer d-flex justify-content-between'>
            <p className="align-self-center mb-0">{productName}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className='mr-1'>$</span>{price}
            </h5>

          </div>
        </div>
      </ProductWrapper>
    )
  }
}