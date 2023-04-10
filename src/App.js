import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'

function App() {
  // Started 10:00AM 10/04/2023 all basic features finished at 1:00PM 10/04/2023
  // Theme state, passed to all components that need to change their theme.
  const [theme, setTheme] = useState('Light');

  return (
    <div>
      <SearchLogic theme={theme} />
      <SliderDisplay theme={theme} setTheme={setTheme}/>
    </div>
  )
}

function SliderDisplay({ theme, setTheme }) {

  const handleClick = (event) => {
    // If theme is truthy, set to dark, otherwise light. Light/Dark are used in to define the second part of a className e.g. formDark vs. formLight.
    if(event.target.checked) {
      setTheme('Dark');
    } else {
      setTheme('Light')
    }
  // DEBUG console.log(theme);
  }

  return (
    <label class="switch">
      <input type="checkbox" onClick={handleClick}/>
      <span class="slider round"></span>
    </label>
  )
}


function SearchLogic({ theme }) {
  // Input state (for search bar), API request state for user information returned from the API request to GitHub. Info is passed to DisplayRepo for display.
  const [input, setInput] = useState('');
  const [requestAPIResult, setAPIResult] = useState({});

  // Check that requestAPIResult.user (user information) is defined before display. Could also check if requestAPIResult.repo is there as well.
  return (
    <div>
      <SearchInput setInput={setInput} input={input} setAPIResult={setAPIResult} theme={theme}/>
      {requestAPIResult.user && <DisplayRepo user={requestAPIResult.user} repos={requestAPIResult.repos} />}
    </div>
  );
}

function SearchInput({ setInput, input, setAPIResult, theme }) {
  // Make sure state is up to date by using setAPIResult.
  const handleInput = (event) => {
    // event.target.value refreneces the current data input in the form. event.preventDefault stops reloading.
    event.preventDefault();
    setInput(event.target.value);
  }

  // Submit and set response data onClick
  const requestGitHubAPI = async (event) => {
    // Stop reload on submit.
    event.preventDefault();

    // Check for empty string (empty input)
    if (input === "") {
      return;
    } else {
      // Get user info
      const userResponse = await fetch(`https://api.github.com/users/${input}`);
      const userJSONData = await userResponse.json();

      // Get repo info
      const repoResponse = await fetch(`https://api.github.com/users/${input}/repos`);
      const repoJSONData = await repoResponse.json();

      if (userJSONData.message == "Not Found") {
        alert("Sorry, could not find user!")
      } else {
        // Set both repo and user data using the setAPIResult passed in. Must be set at the same time.
        setAPIResult({ repos: repoJSONData, user: userJSONData });
      }
    }
  }

  // Define the form. This could be its own component if need be. value={input} refrences the current state of the input.
  return (
    <form className={`form${theme}`} onSubmit={requestGitHubAPI}>
      <input className='formInput' type="text" onChange={handleInput} value={input} placeholder='Enter GitHub profile...' />
      <input className='formSubmitBtn' type="submit" value="Submit" />
    </form>
  )
}


function DisplayRepo({ user, repos }) {
  // This takes in a user and multiple repos that are sorted and top 4 are displayed. This is designed to be reused in the case of multiple users.

  const top = (repoList) => {
    // Combine stars and forks (forks_count + stargazers_count) and add to each object.
    repoList.forEach(repo => repo.starAndFork = (repo.forks_count + repo.stargazers_count));

    // Get each fork+star value in each object and sort the list so the highest fork+star is first in descending order.
    function sortByHighestForkStar(a, b) {
      if (a.starAndFork < b.starAndFork) {
        return 1;
      } else if (a.starAndFork > b.starAndFork) {
        return -1;
      } else {
        return 0;
      }
    }

    // Create the sorted list out of repoList (normal list with fork+star added).
    const sortedRepoList = repoList.sort(sortByHighestForkStar)

    // DEBUG: console.log(sortedRepoList);
    // Slice the list to get the first 4 elements.
    return sortedRepoList.slice(0, 3);
  }
  // If user is not defined yet, replace return with 'loading...'
  if (!user) {
    console.log('loading...');
    return (
      <p>Loading</p>
    )
  }

  // Display user info along with a map to dispaly each repo.
  return (
    <div>
      <div>
        <p>Name: {user.name}</p>
        <p>user name: {user.login}</p>
        <img src={user.avatar_url} />
        <p>Followers: {user.followers}</p>
        <p>Repos: {user.public_repos}</p>
      </div>
      <div>
        {repos && top(repos).map(repo => (<div>
          <p>{repo.name}</p>
          <p>{repo.html_url}</p>
          <p>{repo.forks_count}</p>
          <p>{repo.stargazers_count}</p>
        </div>
        )
        )
        }
      </div>
    </div>
  )
}

export default App;
