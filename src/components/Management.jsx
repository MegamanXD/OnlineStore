import React from "react";
import { ProductConsumer } from '../Context'
import { ProductWrapper } from './StyledComponents'
import Pagination from "react-js-pagination";

export default class ListView extends React.Component {
    //Constructor with the states
    constructor(props) {
        super(props);
        this.state = {
            id: '', productName: '', price: '', description: '', brand: '', producer: '', imageUrl: '', productType: '',
            activePage: 1, itemsCountPerPage: 3
        };
        this.updateState = this.updateState.bind(this);
        this.reset = this.reset.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    //Set activePage based on user activities
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    //Reset the form
    reset() {
        this.setState({ id: '', productName: '', price: '', description: '', brand: '', producer: '', imageUrl: '', productType: '', })
    }

    //Update user input into the state
    updateState(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    //Edit existing products
    editProduct = (id, productName, price, description, brand, producer, imageUrl, productType) => {
        //Throw the data into the form
        this.setState({ id: id, productName: productName, price: price, description: description, brand: brand, producer: producer, imageUrl: imageUrl, productType: productType });

        //Jump to the top to fill in the form
        let element = document.getElementById('jumpToTop');
        element.scrollIntoView(false);
    };

    render() {
        const { id, productName, price, description, brand, producer, imageUrl, productType } = this.state;
        const { activePage, itemsCountPerPage } = this.state;
        let beginPage = itemsCountPerPage * (activePage - 1);
        let endPage = itemsCountPerPage * activePage - 1;

        return (
            <ProductConsumer>
                {value =>
                    <ProductWrapper>
                        {/* Map each element of the List to a format to create cards */}
                        <div className='col-xl-10 mx-auto mt-5'>
                            <div>
                                <div className="card my-5 p-2 border-white">
                                    <div className='row'>
                                        {/* Product form */}
                                        <div className='col-xl-12 col-lg-8 col-md-8 col-sm-12 col-12 mx-auto'>
                                            <div className='card-body'>
                                                <div className='card-header text-center bg-info text-white' id='jumpToTop'> <h1>Product form</h1> </div>

                                                {/* Product ID */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Product ID</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='id' value={id} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product ID */}

                                                {/* Product Name */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Name</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='productName' value={productName} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Name */}

                                                {/* Product Price */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Price  </b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='number' className='form-control' name='price' value={price} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Price */}

                                                {/* Product Descriptions */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Descriptions</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <textarea className='form-control' name="description" value={description} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Descriptions */}

                                                {/* Product Brand */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Brand</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='brand' value={brand} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Brand */}

                                                {/* Product Producer */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Producer</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='producer' value={producer} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Producer */}

                                                {/* Product Image URL */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Image URL</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='imageUrl' value={imageUrl} onChange={this.updateState} />
                                                    </div>
                                                </div>
                                                {/* End Product Image URL */}

                                                {/* Product Category */}
                                                <div className='row my-2'>
                                                    <div className='col-lg-3 col-form-label'>
                                                        <b>Category</b>
                                                    </div>

                                                    <div className='col-lg-9'>
                                                        <input type='text' className='form-control' name='productType' value={productType} onChange={this.updateState} />
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <button className="btn-lg btn-info mx-auto mt-3" onClick={() => value.addUpdateProduct(id, productName, price, description, brand, producer, imageUrl, productType)}>Add/Update</button>
                                                    <button className="btn-lg btn-warning text-white mx-auto mt-3" onClick={this.reset}>Clear</button>
                                                </div>
                                                {/* End Product Category */}

                                            </div>
                                        </div>
                                    </div>
                                    {/* End Product form */}
                                </div>

                                {/* Map each element of the list to create cards */}
                                {value.products.filter((item, i) => i >= beginPage && i <= endPage).map(
                                    product =>
                                        <div className="card my-5 p-5 border-white" key={product.id}>
                                            <div className='row no-gutters'>
                                                {/* Product Image */}
                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                    <div><img src={product.imageUrl} alt="product" className="card-img-top" /></div>
                                                </div>
                                                {/* End Product Image */}

                                                {/* Product Details */}
                                                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12'>
                                                    <div className='card-body'>
                                                        <b>Product ID:  </b>    {product.id}<br />
                                                        <b>Name:        </b>    {product.productName}<br />
                                                        <b>Price:       </b>    ${product.price}<br />
                                                        <b>Description: </b>    {product.description}<br />
                                                        <b>Brand:       </b>    {product.brand}<br />
                                                        <b>Producer:    </b>    {product.producer}<br />
                                                        <b>Category:    </b>    {product.productType}<br /><br />

                                                        <button className="btn-lg btn-info mr-5" onClick={() => this.editProduct(product.id, product.productName, product.price, product.description, product.brand, product.producer, product.imageUrl, product.productType)}>Edit</button>
                                                        <button className="btn-lg btn-danger" onClick={() => value.deleteProduct(product.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Product Details */}
                                        </div>
                                )}

                                {/* Pagination */}
                                <div className='d-flex justify-content-center'>
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={value.products.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>
                                {/* End pagination */}

                            </div>
                        </div>
                    </ProductWrapper>
                }
            </ProductConsumer>
        );
    }
}