import React from 'react'
import {ProductConsumer} from '../Context'
import ProductList from "./ProductList";

export default class Search extends React.Component {
    //Constructor with the states
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            minPrice: '',
            maxPrice: '',
            category: ''
        };
        this.updateState = this.updateState.bind(this);
    }

    //Update user input into the state
    updateState(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    //Reset page to page 1
    backToPageOne = () => { this.child.current.handlePageChange(1) };

    render() {
        const {minPrice, maxPrice, category} = this.state;
        return (
            <ProductConsumer>
                {value =>
                    <div>
                        <div className='row'>
                            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 SearchInputArea TextCentered my-5'>
                                <div className='card border-dark ml-4'>
                                    <div className='card-header bg-dark text-white text-center'>
                                        <h3>Filter</h3>
                                    </div>

                                    <div className='card-body text-center'>
                                        {/*Filter by price*/}
                                        <h5>By price</h5>
                                        <input className='px-2' type="number" placeholder='From' name='minPrice' value={minPrice} onChange={this.updateState}/><br/>
                                        <input className='px-2' type="number" placeholder='To' name='maxPrice' value={maxPrice} onChange={this.updateState}/><br/>

                                        <button onClick={ () => {value.searchPrice(minPrice, maxPrice); value.setFound(); this.backToPageOne()}}>Go</button>
                                        <br/><br/>
                                        {/*End price filter*/}

                                        {/*Filter by product type*/}
                                        <h5>By product type</h5>
                                        <input className='px-2' list="CategoryList" type="text" placeholder='Category name' name='category' value={category} onChange={this.updateState}/>
                                        <datalist id="CategoryList">
                                            {value.productTypes.map(
                                                (type, i) => <option value={type} key={i}/>
                                            )}
                                        </datalist>

                                        <button onClick={ () => {value.searchCategory(category); value.setFound(); this.backToPageOne()}}>Go</button>
                                        <br/><br/>
                                        {/*End product type filter*/}

                                        {/* Refresh page button */}
                                        <button onClick={ () => {
                                            value.getProducts();
                                            this.setState({minPrice: '', maxPrice: '', category: ''});
                                            value.setAll();
                                            this.backToPageOne();
                                        }}
                                        >
                                            Refresh page
                                        </button>
                                        {/* End refresh page button */}
                                    </div>
                                </div>
                                <br/>
                            </div>

                            <div className='col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 SearchResultArea'>
                                <ProductList ref={this.child}/>
                            </div>
                        </div>
                    </div>
                }
            </ProductConsumer>
        )
    }
}