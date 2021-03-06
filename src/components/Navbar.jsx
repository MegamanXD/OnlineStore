import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavWrapper } from "./StyledComponents.js";
import { ProductConsumer } from '../Context'

export default class Navbar extends Component {
    //Declaring states to be used
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    //Update name as typed in Search bar
    handleChange(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    render() {
        return (
            <ProductConsumer>
                {value =>
                    <NavWrapper className="navbar navbar-expand-sm navbar-dark bg-dark px-sm-5">
                        {/* Logo */}
                        <Link to="/">
                            <i className="fab fa-phoenix-framework navbar-brand" />
                        </Link>
                        {/* End logo */}

                        <ul className="navbar-nav align-items-center">
                            {/* Products tab */}
                            <li className="nav-item ml-5">
                                <Link to="/" className="nav-link">
                                    Products
                            </Link>
                            </li>
                            {/* End products tab */}

                            {/* Management tab */}
                            <li className="nav-item ml-5">
                                <Link to="/management" className="nav-link">
                                    Management
                            </Link>
                            </li>
                            {/* End management tab */}
                        </ul>

                        {/* Search-product-by-name bar*/}
                        <div className='ml-auto'>
                            <span className="mr-2">
                                <input className='px-2' list="ProductNameList" type='text' placeholder='Product name' name='name' value={this.state.name} onChange={this.handleChange} />
                                <datalist id='ProductNameList'>
                                    {value.products.map(
                                        product => <option value={product.productName} key={product.id} />
                                    )}
                                </datalist>

                                <button onClick={() => { value.searchProductName(this.state.name); value.setFound() }}>Search</button>
                            </span>
                        </div>
                        {/* End search-product-by-name bar*/}
                    </NavWrapper>
                }

            </ProductConsumer>

        );
    }
}