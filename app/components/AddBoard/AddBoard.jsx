/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, Label, Input, Button } from 'reactstrap';

class AddBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment : ""
        }
    }

    onChange(comment) {
        this.setState({comment : comment});
    }

    render() {
        return (
            <div>
   
                <FormGroup>

                    <Label for="boardName">Board Name</Label>
                    <Input onChange={(e) => this.onChange(`${e.target.value}`)} value={this.state.comment} type="email" name="text" id="boardName" />
                </FormGroup>

                <Button color="success" onClick={() => {
                    this.props.addBoard(this.state.comment);
                    this.setState({comment : ""});
                }}>Add Board</Button>
            </div>
            
        );
    }
}

export default AddBoard;
