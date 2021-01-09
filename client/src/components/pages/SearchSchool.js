import React, { Fragment, Component } from 'react';
import Schools from '../getSchools';
import Filters from '../filterSchool';

const inputStyle = {
    display: 'flex',
    justifyContent: 'center'
}

class SearchSchool extends Component {
    render() {
        return(
            <Fragment>
                <div style={inputStyle}>
                    
                    <Filters />
                    <Schools />
                </div>
                
            </Fragment>
        )};
        
}

export default SearchSchool;