import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'

function App() {
  // Started 10AM 10/04/2023 all basic features finished at 1:00PM (1:20PM)

  const [theme, setTheme] = useState('.dark');

  return (
    <div>
      <SearchLogic theme={theme} />
    </div>
  )
}

function SearchLogic({ theme }) {
  const [input, setInput] = useState('');
  const [requestAPIResult, setAPIResult] = useState();

  return (
    <div>
      <SearchInput setInput={setInput} input={input} setAPIResult={setAPIResult} />
      {requestAPIResult && <DisplayRepo user={requestAPIResult.user} repos={requestAPIResult.repos} />}
    </div>
  );
}

function SearchInput({ setInput, input, setAPIResult }) {
  // Make sure state is up to date
  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  }

  // Submit and set response data on button click
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
      
      if(userJSONData.message == "Not Found"){
        alert("Sorry, could not find user!")
      } else {
        setAPIResult({ repos: repoJSONData, user: userJSONData });
      }
    }
  }

  return (
    <form onSubmit={requestGitHubAPI}>
      <input type="text" onChange={handleInput} value={input} placeholder='Enter GitHub profile...' />
      <input type="submit" value="Submit" />
    </form>
  )
}


function DisplayRepo({ user, repos }) {
  console.log(repos)

  const top = (repoList) => {
    // Combine stars and forks
    // forks_count + stargazers_count
    repoList.forEach(repo => repo.starAndFork = (repo.forks_count + repo.stargazers_count));

    function sortByHighestForkStar(a, b) {
      if (a.starAndFork < b.starAndFork) {
        return 1;
      } else if (a.starAndFork > b.starAndFork) {
        return -1;
      } else {
        return 0;
      }
    }

    const sortedRepoList = repoList.sort(sortByHighestForkStar)

    console.log(sortedRepoList);
    return sortedRepoList.slice(0, 3);
  }

  if (!user) {
    console.log('loading...');
    return (
      <p>Loading</p>
    )
  }

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
