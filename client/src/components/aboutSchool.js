import React, {Fragment, useEffect, useState} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {Container, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import Background from './assets/education.jpg';
import {Link, Route} from 'react-router-dom';
import './aboutSchool.css';


const AboutSchoolInfo = (props) => {
    
    const [school, setSchool] = useState({});
    const [loading, setLoading] = useState(false);
    
    // get user
    const getSchool = async() => {
        try{
            console.log(props.props.match.params.id)
            const response = await fetch(`/school/${props.props.match.params.id}`);
            const jsonData = await response.json();
            setSchool(jsonData[0]);
            setLoading(true);
        }catch (error) {
            console.error(error);
            setLoading(true);
        }

    }

    
    const items= Array.from(Array(school.rating).keys())
        
    useEffect(()=>{
        getSchool();
    }, [])

    console.log(school)
    return (
        <Fragment>
            {loading ? (
            <Container style={{ width: '80%', minHeight: "80vh"}} className="shadow p-3 mb-5 bg-white rounded">
            <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={Background} />
            <Card.Body>
            <Card.Title style={{color:"#000051", textAlign:"center", fontWeight:"bold"}}>{school.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{width: "40%", margin:"auto"}}>
            <ListGroupItem><span style={{marginRight:"10px"}}>ADDRESS:</span>{school.adress_str}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>EMAIL:</span> {school.email}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>PHONE:</span>  {school.phone}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>WEBSITE:</span>  visit website</ListGroupItem>
            </ListGroup>
            <ListGroup className="list-group-flush d-flex" style={{width: "40%", margin:"auto"}}>
            <ListGroupItem><span style={{marginRight:"10px"}}>AREAS:</span>  {school.areas}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>LANGUAGE CLASSES:</span>  {school.languageClasses ?<i className="fas fa-thumbs-up" style={{color:'#B71C1C'}}></i> : <i className="fas fa-thumbs-down" style={{color:'#B71C1C'}}></i>}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>NETWORK:</span>  {school.network}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>RATING:</span>{items.map((item,index)=>{
             return <i className="fas fa-star" key={index} style={{color:'#B71C1C'}}></i>
     })}</ListGroupItem>
            </ListGroup>
            </Card>
            </Container>
        ) : (
            <div className="d-flex justify-content-center align-items-center mt-5">
            <ReactBootStrap.Spinner animation="border" variant="danger"/>
            </div> 
        )}
        </Fragment>
    )

}

export default AboutSchoolInfo;