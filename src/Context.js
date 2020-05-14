import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import config from './config.json'

//Start with creating the context
//A context has 2 sides: a Provider that provides the info, and a Consumer that uses the info
const ProductContext = React.createContext();

//Next, we define the Provider
class ProductProvider extends Component {
    state = {
        products: [],
        productTypes: [],
        detailProduct: {},
        foundProducts: [],
        allOrFound: 'all',
    };

    //Prepare the data before running the application
    componentDidMount() {
        this.getProducts();
    }

    /* CRUD operations */
    //Create new product
    createProduct = async (id, productName, price, description, brand, producer, imageUrl, productType) => {
        try {
            const params = {
                "id": id,
                "productName": productName,
                "price": parseFloat(price),
                "description": description,
                "brand": brand,
                "producer": producer,
                "imageUrl": imageUrl,
                "productType": productType
            };

            await axios.post(`${config.api.invokeURL}/ecommerce/${id}`, params);
            alert('Added!');
            this.getProducts();
        } catch (error) {
            alert(`Unable to add product: ${error}`)
        }
    }

    //Read all products
    getProducts = async () => {
        try {
            const res = await axios.get(`${config.api.invokeURL}/ecommerce/`);

            const data = res.data.filter(
                product =>
                    product.id &&
                    product.productName &&
                    product.price &&
                    product.description &&
                    product.brand &&
                    product.producer &&
                    product.imageUrl &&
                    product.productType
            );

            this.setState({ products: data, foundProducts: data });
            this.setState({ productTypes: _.uniq(this.state.products.map(product => product.productType)) })
        } catch (error) {
            alert(`Unable to get all products: ${error}`)
        }
    }

    //Update product
    updateProduct = async (id, productName, price, description, brand, producer, imageUrl, productType) => {
        try {
            const params = {
                "id": id,
                "productName": productName,
                "price": parseFloat(price),
                "description": description,
                "brand": brand,
                "producer": producer,
                "imageUrl": imageUrl,
                "productType": productType
            };

            await axios.patch(`${config.api.invokeURL}/ecommerce/${id}`, params);
            alert('Updated!');
            this.getProducts();
        } catch (error) {
            alert(`Unable to update product: ${error}`)
        }
    }

    //Delete a product
    deleteProduct = async (id) => {
        if (window.confirm("Do you want to delete?")) {
            try {
                await axios.delete(`${config.api.invokeURL}/ecommerce/${id}`);
                alert('Deleted!');
                this.getProducts();
            } catch (error) {
                alert(`Unable to delete product: ${error}`)
            }
        }
    };

    //Add or update our products
    addUpdateProduct = (id, productName, price, description, brand, producer, imageUrl, productType) => {
        if (this.state.products.map(product => product.id).includes(id)) {
            this.updateProduct(id, productName, price, description, brand, producer, imageUrl, productType);
        }
        else {
            this.createProduct(id, productName, price, description, brand, producer, imageUrl, productType);
        }
    };

    /* Set display mode */
    //Set all product mode
    setAll = () => { this.setState({ allOrFound: 'all' }) };

    //Set found product mode
    setFound = () => { this.setState({ allOrFound: 'found' }) };

    //A method to get a product
    getItem = (id) => this.state.products.find(item => item.id === id);

    //This method helps us display our Product Details
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState({ detailProduct: product })
    };

    /* Filter actions */
    //Search by Product Name
    searchProductName = (name) => {
        let matchingProducts = this.state.products.filter(product => product.productName.toLowerCase().indexOf(name.toLowerCase()) > -1);
        this.setState({ foundProducts: matchingProducts })
    };

    //Search by Price
    searchPrice = (minPrice, maxPrice) => {
        let matchingProducts = this.state.products.filter(product => parseFloat(product.price) >= minPrice && parseFloat(product.price) <= maxPrice);
        this.setState({ foundProducts: matchingProducts });
    };

    //Search by Category
    searchCategory = (productType) => {
        let matchingProducts = this.state.products.filter(product => product.productType.toLowerCase() === productType.toLowerCase());
        this.setState({ foundProducts: matchingProducts });
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,

                addUpdateProduct: this.addUpdateProduct,
                getProducts: this.getProducts,
                deleteProduct: this.deleteProduct,

                searchProductName: this.searchProductName,
                searchPrice: this.searchPrice,
                searchCategory: this.searchCategory,

                setAll: this.setAll,
                setFound: this.setFound,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//Then, we define the Consumer
const ProductConsumer = ProductContext.Consumer;

//Finally, we export both the Provider and the Consumer
export { ProductProvider, ProductConsumer };