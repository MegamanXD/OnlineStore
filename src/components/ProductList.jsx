import React, { Component, Fragment } from 'react'
import Title from './Title'
import { ProductConsumer } from "../Context"
import Product from "./Product";
import Pagination from "react-js-pagination";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1, itemsCountPerPage: 4 };

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  //Set activePage based on user activities
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    // set data for pagination
    const { activePage, itemsCountPerPage } = this.state;
    let beginPage = itemsCountPerPage * (activePage - 1);
    let endPage = itemsCountPerPage * activePage - 1;

    return (
      <Fragment>
        <ProductConsumer>
          {value =>
            <div className="py-5">
              <div className="container">
                <Title name={value.allOrFound} title='products' />

                {/* List of products */}
                <div className="row">
                  {value.foundProducts.filter((item, i) => i >= beginPage && i <= endPage).map(product => {
                    return <Product key={product.id} product={product} />
                  })
                  }
                </div>
                {/* End list of products */}

                {/* Pagination */}
                <div className='d-flex justify-content-center'>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={value.foundProducts.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass='page-item'
                    linkClass='page-link'
                  />
                </div>
                {/* End pagination */}
              </div>
            </div>
          }
        </ProductConsumer>
      </Fragment>
    )
  }
}
