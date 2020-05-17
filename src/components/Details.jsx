import React, { Component } from 'react'
import {ProductConsumer} from '../Context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from "./StyledComponents";

export default class Details extends Component {
  render() {
    return (
        <ProductConsumer>
          { value => {
            //Get all neccessary data from the ContextAPI
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

                  <div className='row'>
                    {/*Product image*/}
                    <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                      <img src={imageUrl} className='img-fluid' alt='product'/>
                    </div>
                    {/*End product image*/}

                    <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                      {/*Product name*/}
                      <h1>model: {productName}</h1>
                      {/*End product name*/}

                      {/* Brand */}
                      <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                        made by: <span className='text-uppercase'> {brand}</span>
                      </h4>
                      {/* End brand */}

                      {/* Price */}
                      <h4 className='text-blue'>
                        <strong>
                          price: <span>$</span> {price}
                        </strong>
                      </h4>
                      {/* End price */}

                      {/* Description */}
                      <p className='text-capitalize font-weight-bold mt-3 mb-0'>
                        Product info
                      </p>
                      {/* End description */}

                      <p className='text-muted lead'> {description}</p>
                      {/* End description */}

                      {/* Back button */}
                      <div>
                        <Link to='/'>
                          <ButtonContainer>
                            back to products
                          </ButtonContainer>
                        </Link>
                      </div>
                      {/*End back button*/}
                    </div>
                  </div>
                </div>
                )
          }}
        </ProductConsumer>
    )
  }
}
