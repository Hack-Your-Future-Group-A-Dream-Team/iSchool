import React, {Fragment} from 'react';
import AboutSchoolInfo from '../aboutSchool'

const SchoolProfilePage =(props) =>(
        <Fragment>
        <div className="container mt-5">
        <AboutSchoolInfo props={props}/>      
        </div>
        </Fragment>
);

export default SchoolProfilePage;