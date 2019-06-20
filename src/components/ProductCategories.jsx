import React from 'react'
import {ProductConsumer} from '../Context'
import Pagination from "react-js-pagination";

export default class ProductCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 'Empty', name: '', activePage: 1, itemsCountPerPage: 5};

        this.updateState=this.updateState.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    //Set activePage based on user activities
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    //Reset the form
    reset(){
        this.setState({id: 'Empty', name: ''})
    }

    //Edit existing categories
    editCategory(id, name){
        //Throw the data into the form
        this.setState({id: id, name: name});

        //Jump to the top to fill in the form
        let element = document.getElementById('jumpToTop');
        element.scrollIntoView(false);

    }

    //Update user input into the state
    updateState(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    render() {
        const {id, name} = this.state;
        const {activePage, itemsCountPerPage} = this.state;
        let beginPage = itemsCountPerPage*(activePage-1);
        let endPage = itemsCountPerPage*activePage - 1;
        return (
            <ProductConsumer>
                {value =>
                    <div className='container my-lg-5'>
                        <div className='card border-dark'>
                            <div className='card-header text-center bg-dark text-white'> <b>Product categories</b> </div>

                            <div className='card-body'>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action 1</th>
                                        <th scope="col">Action 2</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">{id} </th>
                                        <td id='jumpToTop'><input type="text" name="name" value={name} onChange={this.updateState} placeholder="Name" /></td>
                                        <td><button className='btn btn-success allCentered' onClick={ () => value.addUpdateCategory(id, name)}>Add/Update</button></td>
                                        <td><button className='btn btn-warning allCentered text-white' onClick={this.reset.bind(this)}>Clear</button></td>
                                    </tr>

                                    {value.categories.filter( (item,i) => i>= beginPage && i<= endPage ).map(
                                        category =>

                                            <tr key={category._id}>
                                                <th scope="row">{category._id}</th>
                                                <td>{category.name}</td>
                                                <td> <button className='btn btn-primary allCentered' onClick={ this.editCategory.bind(this, category._id, category.name) }>Edit</button> </td>
                                                <td> <button className='btn btn-danger allCentered' onClick={ () => value.deleteCategory(category._id) }>Delete</button> </td>
                                            </tr>
                                    )}
                                    </tbody>
                                </table>

                                <div className='d-flex justify-content-center'>
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={value.categories.length}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </ProductConsumer>
        )
    }
}