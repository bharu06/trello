/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import BoardView from '../BoardView/BoardView';
import {withRouter} from 'react-router-dom';
import {getAllBoards, createBoard} from '../../helpers/DataProvider'
import AddBoard from '../AddBoard/AddBoard';

import './AllBoardsList.css';

class AllBoardsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "boards" : [
            ]
        }
        this.nextPath = this.nextPath.bind(this);
        this.addBoard = this.addBoard.bind(this);
    }

    componentDidMount() {
        var boards = getAllBoards();
        console.log("all boards");
        console.log(boards);
        this.setState({boards : boards});
    }
    nextPath(path) {
        this.props.history.push(path);
    }

    addBoard(board_name) {
        createBoard(board_name);
        var boards = getAllBoards();
        this.setState({boards : boards});
    }

    render() {

        const { match, location, history } = this.props;
        return (
            <div id="allboards">
                {
                    this.state.boards.map((board,index) => (
                        <div>

                            <Button onClick={() => this.nextPath('/boardview/' + board.id) }>
                                
                                {board.name} 
                            </Button>
                            <p></p>
                        </div>
                    ))
                }

                <AddBoard addBoard={this.addBoard}/>
            </div>
            
        );
    }
}

export default withRouter(AllBoardsList);
