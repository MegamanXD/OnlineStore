import React, { Component } from 'react'
import {ProductConsumer} from '../Context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from "./StyledComponents";

export default class Details extends Component {
  render() {
    return (
        <ProductConsumer>
          { value => {
            const {brand, imageUrl, description, price, productName} = value.detailProduct;
            return(
                <div className='container py-5'>
                  {/*Product name*/}
                  <div className='row'>
                    <div className='col-10 mx-auto text-center text-slanted text-blue my-5'>
                      <h1>{productName}</h1>
                    </div>
                  </div>
                  {/*End product name*/}

                  {/*Product description*/}
                    {/*product image*/}
                  <div className='row'>
                    <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                      <img src={imageUrl} className='img-fluid' alt='product'/>
                    </div>
                    {/*End product image*/}


                    <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                      {/*product text*/}
                      <h1>model: {productName}</h1>

                      <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                        made by: <span className='text-uppercase'> {brand}</span>
                      </h4>

                      <h4 className='text-blue'>
                        <strong>
                          price: <span>$</span> {price}
                        </strong>
                      </h4>

                      <p className='text-capitalize font-weight-bold mt-3 mb-0'>
                        Product info
                      </p>

                      <p className='text-muted lead'> {description}</p>
                      {/*End product text*/}

                      {/*buttons*/}
                      <div>
                        <Link to='/'>
                          <ButtonContainer>
                            back to products
                          </ButtonContainer>
                        </Link>

                      </div>
                      {/*End buttons*/}
                    </div>
                  </div>
                  {/*End product description*/}
                </div>
                )
          }}
        </ProductConsumer>
    )
  }
}
