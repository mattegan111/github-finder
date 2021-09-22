import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import { searchUsers, getUserAndRepos } from './context/github/actions';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const handleSearchUsers = async (text) => {
    setLoading(true);
    const res = await searchUsers(text);
    setUsers(res);
    setLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await getUserAndRepos(username);
    setUser(res.user);
    setLoading(false);
  };

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await getUserAndRepos(username);
    setRepos(res.repos);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });

    setTimeout(() => setAlert(null));
  };

  return (
    <Router>
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search 
                searchUsers={handleSearchUsers} 
                clearUsers={clearUsers} 
                showClear={users.length > 0 ? true : false}
                setAlert={showAlert} //Should chase 'setAlert' through program and rename
              />
              <Users loading={loading} users={users} />
            </Fragment>
                )} />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User 
              { ...props } 
              getUser={getUser} 
              getUserRepos={getUserRepos} 
              user={user} 
              repos={repos}
              loading={loading} 
            />
          )} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
