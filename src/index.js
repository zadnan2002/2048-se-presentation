import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import './styles.scss';
import BoardView from './components/Board';


const App = () => {
    return (
        <div>
           <BoardView />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));