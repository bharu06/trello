import ls from 'local-storage';

const initBoards = [
    {
        name:  'Sample Board',
        id:    'board_1',
        tasks: {

            TODO: [
                {
                    id:      '1',
                    content: 'Sample todo 1',
                },
            ],
            IN_PROGRESS: [
                {
                    id:      '2',
                    content: 'Sample in progress 1',
                },
            ],
            REVIEW: [

                {
                    id:      '3',
                    content: 'Sample review 1',
                },
            ],
            DONE: [

                {
                    id:      '4',
                    content: 'Sample done 1',
                },
            ],
        },
    },
    {
        name:  'Sample Board 2',
        id:    'board_2',
        tasks: {

            TODO: [
                {
                    id:      '5',
                    content: 'b2 Sample todo 1',
                },
            ],
            IN_PROGRESS: [
                {
                    id:      '6',
                    content: 'b2 Sample in progress 1',
                },
            ],
            REVIEW: [

                {
                    id:      '7',
                    content: 'b2 Sample review 1',
                },
            ],
            DONE: [

                {
                    id:      '8',
                    content: 'b2 Sample done 1',
                },
            ],
        },
    },
];

export function guidGenerator() {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
}

export function createBoard(board_name) {
    const lsBoards = ls.get('boards');
    const newBoard = {};
    newBoard.id = guidGenerator();
    newBoard.name = board_name;
    newBoard.tasks = {
        TODO:        [],
        IN_PROGRESS: [],
        REVIEW:      [],
        DONE:        [],
    };
    lsBoards.push(newBoard);
    ls.set('boards', lsBoards);
    return lsBoards;
}

export function getAllBoards() {
    let lsBoards = ls.get('boards');
    if (lsBoards == null) {
        ls.set('boards', initBoards);
    }
    lsBoards = ls.get('boards');
    console.log('ls boards');
    console.log(lsBoards);
    return lsBoards;
}

export function getBoardName(boardid) {
    const boards = ls.get('boards');
    for (let i = 0; i < boards.length; i += 1) {
        if (boards[i].id === boardid) {
            return boards[i].name;
        }
    }
    return null;
}

export function getTasksForBoard(boardid) {
    const boards = ls.get('boards');
    for (let i = 0; i < boards.length; i += 1) {
        if (boards[i].id === boardid) {
            return boards[i].tasks;
        }
    }
    return [];
}

export function addTasksToBoard(boardid, stage, task) {
    const boards = ls.get('boards');
    let tasks = [];
    for (let i = 0; i < boards.length; i += 1) {
        if (boards[i].id === boardid) {
            tasks = boards[i].tasks;
        }
    }
    tasks[stage].push(task);
    ls.set('boards', boards);
}

export function updateTasks(boardid, tasks) {
    const boards = ls.get('boards');
    for (let i = 0; i < boards.length; i += 1) {
        if (boards[i].id === boardid) {
            boards[i].tasks = tasks;
            break;
        }
    }
    ls.set('boards', boards);
}
