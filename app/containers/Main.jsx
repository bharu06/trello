import React   from 'react';
import AllBoardsList from '../components/AllBoardsList/AllBoardsList';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import BoardView from '../components/BoardView/BoardView';
import NavBar from '../components/NavBar/NavBar';

const Main = () => (
    <Router>
        <div id="main-container">
            <NavBar />
            <Switch>
            <Route path="/boardview/:id" component={BoardView} />
            <Route path="/boards" exact>
                <AllBoardsList />
            </Route>
            <Route exact path="/">
                <AllBoardsList />
            </Route>
            </Switch>
        </div>

    </Router>
);

export default Main;
/*

        <Header />
        <Counter />
        <Footer />
*/
