import React, { Component } from 'react';
import { Card, CardTitle, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form'
import Row from 'reactstrap/lib/Row';

const required = val => val && val.length;
const maxLength= len => val => !val || (val.length <= len);
const minLength= len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
    
            this.state = {
                isModalOpen: false
            };
               
            this.toggleModal = this.toggleModal.bind(this);
            
        }
        
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        
    
    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg"  /> Submit Comment
            </Button>
        
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating </Label>
                                        <Control.select model=".rating" className="form-control" validators={{require}}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" className="form-control" 
                                        validators={{required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                            <Errors
                                                className="text-danger"
                                                model=".yourName"
                                                show="touched"
                                                compnent="div"
                                                messages={{
                                                    required: 'required',
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />    
                                        
                                </div>
                                <div>
                                    <Label htmlFor="text">Comment</Label>
                                        <Control.textarea model=".text" rows="6" className="form-control" className="form-control" />
                                </div>
                                <br></br>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderCampsite({campsite}) {
    return(
        <div class="col-md-5 m-1">
            <Card >
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){
        if (comments) {
            return(
                <div class="col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul>
                    {comments.map(comment => {
                        return(
                        <li key={comment.id}>
                            <p>{comment.text}<br />
                            {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>    
                        </li>
                        );
                    })}
                    </ul> 

                    <CommentForm />

                </div>
            );
        };
        return <div></div>        
}    

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;