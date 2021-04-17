/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Alert, Col, Row } from 'reactstrap';
import AddTask from '../AddTask/AddTask';
import {getTasksForBoard, addTasksToBoard, updateTasks, guidGenerator, getBoardName} from '../../helpers/DataProvider';
import './BoardView.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#fdfff4',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class BoardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : {
            }
        };
        this.addTask = this.addTask.bind(this);
    }


    addTask(stage, content) {

        var tasksCopy = this.state.tasks;
        var newTasks = this.state.tasks[stage];
        var newTask = {id : guidGenerator(), content: content}
        newTasks.push(newTask);
        tasksCopy[stage] = newTasks;
        this.setState({tasks : tasksCopy});
        addTasksToBoard(this.state.board_id, stage, newTask);
    }
    
    componentDidMount() {
        var board_id = this.props.match.params.id;
        var tasks = getTasksForBoard(board_id);
        var board_name = getBoardName(board_id);
        this.setState({tasks : tasks, board_id: board_id, board_name: board_name});
    }


    onDragEnd = result => {
        console.log("Result ");
        console.log(result);
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        var sourceDroppable = source.droppableId;
        var destDroppable = destination.droppableId;
        var sourceStage = sourceDroppable.substring(10);
        var destStage = destDroppable.substring(10);
        var tasksCopy = this.state.tasks;
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.state.tasks[sourceStage],
                source.index,
                destination.index
            );
            console.log("new items");
            console.log(items);
            tasksCopy[sourceStage] = items;
            this.setState({tasks : tasksCopy});
        } else {
            var new_result = move(
                this.state.tasks[sourceStage],
                this.state.tasks[destStage],
                source,
                destination
            );
            tasksCopy[destStage] = new_result[destDroppable];
            tasksCopy[sourceStage] = new_result[sourceDroppable];
            console.log(tasksCopy);
            this.setState({
                tasks: tasksCopy
            });
        }
        updateTasks(this.state.board_id, tasksCopy);
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        var stages = ["TODO","IN_PROGRESS","REVIEW","DONE"];
        console.log("Board view called");
        return (
            <div id="boardDiv">
                <Alert id="boardname" color="primary"> Board : {this.state.board_name} </Alert>
                <Row>
                    
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {
                            stages.map((stage,index) => (
                                <div key={"div_"+stage}>
                                    <Col>
                                    <Alert>{stage}</Alert>
                                    <Droppable droppableId={"droppable_" + stage}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.tasks[stage] && this.state.tasks[stage].length > 0 && this.state.tasks[stage].map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}>
                                                                {item.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}

                                                <AddTask stage={stage} addTask={this.addTask}/>
                                            </div>
                                        )}
                                    </Droppable>
                                    </Col>
                                </div>
                                
                            ))
                        }
                    </DragDropContext>
                </Row>

            </div>
            
        );
    }
}

export default BoardView;
