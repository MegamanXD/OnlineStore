import React, {Component} from 'react';
import _ from 'lodash'

const ProductURL = "http://rmit.chickenkiller.com:8080/products";
const CategoryURL = 'http://rmit.chickenkiller.com:8080/productTypes';

//Start with creating the context
//A context has 2 sides: a Provider that provides the info, and a Consumer that uses the info
const ProductContext = React.createContext();

//Next, we define the Provider
class ProductProvider extends Component {
    state={
        products: [],
        categories: [],
        productTypes:[],
        detailProduct: {},
        foundProducts: [],
        allOrFound:'all',
    };

    //Set Products
    setProducts = () => {
        fetch(ProductURL)
            .then(response => response.json())
            .then( response => response.filter(
                product =>
                    product._id &&
                    product.id &&
                    product.name &&
                    product.price &&
                    product.description &&
                    product.brand &&
                    product.producer &&
                    // product.imageUrl &&
                    product.productType
                )
            )
            .then(response => this.setState({ products: response, foundProducts: response }))
            .then(() => {
                this.setState({productTypes: _.uniq(this.state.products.map(product => product.productType))})
            });
    };

    //Set Product Categories
    setProductTypes = () => {
        fetch(CategoryURL)
            .then(response => response.json())
            .then( response => response.filter(
                category =>
                    category._id &&
                    category.name
                )
            )
            .then(response => this.setState({ categories: response }));
    };

    //Set allOrFound
    setAll = () => { this.setState({allOrFound:'all'})};
    setFound = () => { this.setState({allOrFound:'found'})};

    //Prepare the data before running the application
    componentDidMount() {
        this.setProducts();
        this.setProductTypes();
    }

    //A method to get a product
    getItem = (id) => this.state.products.find(item => item._id === id);

    //This method helps us display our Product Details
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState({detailProduct: product})
    };

    //Search by Product Name
    searchProductName = (name) => {
        let matchingProducts = this.state.products.filter( product => product.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
        this.setState({foundProducts: matchingProducts})
    };

    //Search by Price
    searchPrice = (minPrice,maxPrice) => {
        let matchingProducts = this.state.products.filter( product => parseFloat(product.price) >= minPrice && parseFloat(product.price) <= maxPrice );
        this.setState({foundProducts: matchingProducts});
    };

    //Search by Category
    searchCategory = (productType) => {
        let matchingProducts = this.state.products.filter( product => product.productType.toLowerCase() === productType.toLowerCase());
        this.setState({foundProducts: matchingProducts});
    };

    addToCart = (id) => {console.log(`Hello from add to cart. ID is ${id}`)};

    //Delete a category
    deleteCategory = (id) => {
        if (window.confirm('Do you want to delete?')) {
            fetch(CategoryURL + '/' + id, {method: 'delete'})
                .then(() => this.setProductTypes())
        }
    };

    //Add or update our categories
    addUpdateCategory = (id, name) => {
        if (id === 'Empty')
        {
            let newCategory = {
                id: this.state._id,
                name: name
            };
            fetch(CategoryURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(newCategory)
            }).then(() => alert('Added!'))
                .then(() => this.setProductTypes()) //Refresh the page here
        }
        else{
            let updateCategory = {
                _id: id,
                name: name
            };
            fetch(CategoryURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify(updateCategory)
            }).then(() => alert('Updated!'))
                .then(() => this.setProductTypes()) //Reload the database
        }
    };

    //Add or update our products
    addUpdateProduct = (_id,id,name, price,description,brand,producer,imageUrl,productType) => {
        if (_id === 'Empty') {
            let newProduct = {
                id: id,
                name: name,
                price: price,
                description: description,
                brand: brand,
                producer: producer,
                imageUrl: imageUrl,
                productType: productType
            };
            fetch(ProductURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(newProduct)
            }).then(() => alert('Added!'))
                .then(() => this.setProducts())
        }
        else {
            let updatedProduct = {
                _id: _id,
                id: id,
                name: name,
                price: price,
                description: description,
                brand: brand,
                producer: producer,
                imageUrl: imageUrl,
                productType: productType
            };
            fetch(ProductURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify(updatedProduct)
            }).then(() => alert('Updated!'))
                .then(() => this.setProducts())
        }
    };

    //Delete a product
    deleteProduct = (id) => {
        if (window.confirm("Do you want to delete?")) {
            fetch(ProductURL + "/" + id, { method: "delete" }).then(() => this.setProducts());
        }
    };

    render() {
        return (
            <ProductContext.Provider value={ {
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                searchProductName: this.searchProductName,
                searchPrice: this.searchPrice,
                searchCategory: this.searchCategory,
                deleteCategory: this.deleteCategory,
                addUpdateCategory: this.addUpdateCategory,
                setProducts: this.setProducts,
                setAll: this.setAll,
                setFound: this.setFound,
                addUpdateProduct: this.addUpdateProduct,
                deleteProduct: this.deleteProduct
            } }>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//Then, we define the Consumer
const ProductConsumer = ProductContext.Consumer;

//Finally, we export both the Provider and the Consumer
export {ProductProvider,ProductConsumer};