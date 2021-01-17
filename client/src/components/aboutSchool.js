import React, {Fragment, useEffect, useState} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {Container, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import Background from './assets/education.jpg';
import {Link, Route} from 'react-router-dom';
import './aboutSchool.css';
import axios from 'axios';
import CommentRecord from './Comment/CommentRecord';
import StarRating from 'react-star-ratings';



const AboutSchoolInfo = (props) => {
    
    const [school, setSchool] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); 
    const [comments, setComments] =useState()
    
    // get school
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

    };
        
        
    useEffect(()=>{
        getSchool();
    }, []);

    const getComments = async ()=>{

        try{
            await axios.get(
                `/schools/comments?schoolid=${props.props.match.params.id}`)
                .then(res=> {
                    setComments(res.data.comments);
                    setIsOpen(true)
                    }
                    )
                .catch(error => {
                    console.log(error.response);
                });
        }catch (error) {
            console.error(error);
        }
         
    };

    return (
        <Fragment>
            {loading ? (
            <Container style={{ width: '80%', minHeight: "80vh"}} className="shadow p-3 mb-5 bg-white rounded">
            <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={Background} />
            <Card.Body>
            <div>
                <Link style={{color:"#000051", background:"#fff"}}to="/searchschool"><i className="fas fa-2x fa-arrow-circle-left"></i></Link>
            </div>
            <Card.Title style={{color:"#000051", textAlign:"center", fontWeight:"bold"}}>{school.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{width: "50%", margin:"auto"}}>
            <ListGroupItem><span style={{marginRight:"10px"}}>ADDRESS:</span>{school.adress_str}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>EMAIL:</span> {school.email}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>PHONE:</span>  {school.phone}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>WEBSITE:</span>  <a target="_blank" href={school.website}>{school.website}</a></ListGroupItem>
            </ListGroup>
            <ListGroup className="list-group-flush d-flex" style={{width: "50%", margin:"auto"}}>
            <ListGroupItem><span style={{marginRight:"10px"}}>AREA:</span>  {school.areas}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>RECEPTION CLASSES:</span>  {school.languageClasses ?<i className="fas fa-thumbs-up" style={{color:'#B71C1C'}}></i> : <i className="fas fa-thumbs-down" style={{color:'#B71C1C'}}></i>}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>NETWORK:</span>  {school.network}</ListGroupItem>
            <ListGroupItem><span style={{marginRight:"10px"}}>RATING:</span>
            <div><StarRating  name="small-rating" caption="Small!" size={10} totalStars={5} rating={school.rating} starDimension="20px"  starRatedColor="#B71C1C"/></div>
            </ListGroupItem>
            <ListGroupItem>
                <details open={isOpen}>
                <summary onClick={getComments} style={{width:"100%"}}>
                <span style={{marginRight:"10px"}}>COMMENTS:</span><span style={{color:'#B71C1C'}}>({school.comments})</span>
                </summary>
                <div style={{width: '100%', padding:'20px'}}>
                {comments ? (comments.map(comment=>{
                  return <CommentRecord key={comment._id} comment_record={comment}></CommentRecord>
                }
                )) : ""}
                </div>
                <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}} onClick={() => setIsOpen(false)}><i className="fas fa-chevron-circle-up" style={{color:"#B71C1C"}}></i></div>
                </details>
            </ListGroupItem>
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