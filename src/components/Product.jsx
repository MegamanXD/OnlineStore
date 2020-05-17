import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../Context'
import {ProductWrapper} from './StyledComponents'


export default class Product extends Component {
  render() {
    const {id, productName, imageUrl, price} = this.props.product;

    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
            <ProductConsumer>
                { value =>
                    <div className="img-container p-5" onClick={() => value.handleDetail(id) }>
                        {/* Product image */}
                        <Link to="/details">
                            <img src={imageUrl} alt="product" className="card-img-top img-fluid"/>
                        </Link>
                        {/* End product image */}
                    </div>
                }
            </ProductConsumer>

          <div className='card-footer d-flex justify-content-between'>
            {/* Product name */}
            <p className="align-self-center mb-0">{productName}</p>
            {/* End product name */}

            {/* Product price */}
            <h5 className="text-blue font-italic mb-0">
              <span className='mr-1'>$</span>{price}
            </h5>
            {/* End product price */}
          </div>
        </div>
      </ProductWrapper>
    )
  }
}