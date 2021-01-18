import React, { Fragment, Component } from 'react';
import Schools from '../getSchools';
import Filters from '../filterSchool';

const inputStyle = {
    display: 'flex',
    justifyContent: 'center'
}

class SearchSchool extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          filters: null,
        }
    
        this.updateFilter = this.updateFilter.bind(this) 
      }

    updateFilter = (filtersObject) => {
        this.setState({
            filters: filtersObject
        })
    }  

    render() {
        return(
            <Fragment>
                {console.log(this.state.filters)}
                <div className="wholeContainer" style={inputStyle}>
                    
                    <Filters updateFilter={this.updateFilter} />
                    <Schools getFilter={this.state.filters} />
                </div>
                
            </Fragment>
        )};
        
}

export default SearchSchool;