import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import UserPage from '../src/pages/User'
import './App.css';
import DailyRecordPage from './pages/DailyRecord';
import PomodoroTimer from './pages/PomodoroTimer';
import ProjectScheduler from './pages/ProjectScheduler';
import { Menu } from 'antd';
import AddProject from './pages/ProjectScheduler/addProject';
import EditProject from './pages/ProjectScheduler/editProject';



function App() {
  const user = {
    name: 'GoHmoe'
  }
  const [currentPage, setCurrentPage] = useState('');
  return (
    <div>
      <header className='text-xl max-w-full shadow'>
        <div className='h-16 flex'>
          <div className='flex items-center'>
            <div className='ml-4 mr-4 pr-4 border-r-2'><a href='/'>Project Planing Now</a></div>
            <Menu onClick={(e) => { setCurrentPage(e.key) }} selectedKeys={[currentPage]} mode="horizontal">
              <Menu.Item key="WorkingRecord">
                <Link className='' to='/WorkingRecord'>WorkingRecord</Link>
              </Menu.Item>
              <Menu.Item key="PomodoroTimer">
                <Link className='' to='/PomodoroTimer'>PomodoroTimer</Link>
              </Menu.Item>
              <Menu.Item key="ProjectScheduler">
                <Link className='' to='/ProjectScheduler'>ProjectScheduler</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </header>
      <div className=' pt-10'>
        <Switch>
          <Route exact path='/user' render={() => <UserPage user={user}></UserPage>} />
          <Route exact path='/WorkingRecord' render={() => <DailyRecordPage></DailyRecordPage>} />
          <Route exact path='/PomodoroTimer' render={() => <PomodoroTimer></PomodoroTimer>} />
          <Route exact path='/ProjectScheduler' render={() => <ProjectScheduler></ProjectScheduler>} />
          <Route exact path='/ProjectScheduler/add' render={() => <AddProject></AddProject>}></Route>
          <Route exact path='/ProjectScheduler/edit/:projectUUID' render={() => <EditProject></EditProject>}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
