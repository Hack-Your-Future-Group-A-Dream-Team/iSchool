import React, { Fragment, Component } from 'react';
import Schools from '../getSchools';
import Filters from '../filterSchool';

const inputStyle = {
    display: 'flex',
    justifyContent: 'center'
}

class SearchSchool extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataFilters: null
        }
        
        this.setFilter = this.setFilter.bind(this);
    };

    setFilter = (arrayFilters) => {
        this.setState({
            dataFilters: arrayFilters
        })
        console.log(this.state.dataFilters)

    };
    

    render() {
        return(
            <Fragment>
                <div style={inputStyle}>
                    
                    <Filters setFilter = {this.setFilter}/>
                    <Schools dataFilters = {this.state.dataFilters}/>
                </div>
                
            </Fragment>
        )};
        
}

export default SearchSchool;