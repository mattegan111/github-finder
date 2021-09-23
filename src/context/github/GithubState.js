import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
// import { searchUsers, getUserAndRepos } from './context/github/actions'; //Not used in tutorial
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => { //TODO change searchUsers to searchUsers throughout solution
    setLoading();

    const github = await axios.create({
      baseURL: 'https://api.github.com',
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
    });
    
    const res = await github.get(`/search/users?q=${text}`);
    
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();

    const github = await axios.create({
      baseURL: 'https://api.github.com',
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
    });

    const [user, repos] = await Promise.all([
      github.get(`/users/${username}?`),
      github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`)
    ]);

    dispatch({
      type: GET_USER,
      payload: user.data
    });
  };
  
  // Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const github = await axios.create({
      baseURL: 'https://api.github.com',
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
    });

    const [user, repos] = await Promise.all([
      github.get(`/users/${username}?`),
      github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`)
    ]);

    dispatch({
      type: GET_REPOS,
      payload: repos.data
    });
  };

  // Clear Users

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;