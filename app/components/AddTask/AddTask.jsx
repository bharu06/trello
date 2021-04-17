/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, Label, Input, Button } from 'reactstrap';

class AddTask extends React.Component {
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
                    <Input onChange={(e) => this.onChange(`${e.target.value}`)} value={this.state.comment} type="textarea" name="text" id="exampleText" />
                </FormGroup>

                <Button color="success" onClick={() => {
                    this.props.addTask(this.props.stage, this.state.comment);
                    this.setState({comment : ""});
                }}>Add Task</Button>
            </div>
            
        );
    }
}

export default AddTask;
