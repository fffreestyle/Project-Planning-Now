import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import UserPage from '../src/pages/User'
import './App.css';
import DailyRecordPage from './pages/DailyRecord';
import PomodoroTimer from './pages/PomodoroTimer';


function App() {
  const user = {
    name: 'GoHmoe'
  }
  return (
    <div>
      <Link to='/user'>User</Link>
      /
      <Link to='/WorkingRecord'>WorkingRecord</Link>
      /
      <Link to='/PomodoroTimer'>PomodoroTimer</Link>
      <Switch>
        <Route exact path='/user' render={() => <UserPage user={user}></UserPage>} />
        <Route exact path='/WorkingRecord' render={() => <DailyRecordPage></DailyRecordPage>} />
        <Route exact path='/PomodoroTimer' render={() => <PomodoroTimer></PomodoroTimer>} />
      </Switch>
    </div>
  );
}

export default App;
