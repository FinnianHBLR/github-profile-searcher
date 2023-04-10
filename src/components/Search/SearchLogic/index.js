import { useState } from 'react'
import { SearchInput } from './SearchInput';
import { DisplayUserRepo } from './SearchDisplay';

export function SearchLogic({ darkMode }) {
    // Input state (for search bar), API request state for user information returned from the API request to GitHub. Info is passed to DisplayRepo for display.
    const [input, setInput] = useState('');
    const [requestAPIResult, setAPIResult] = useState({});
    
    // This takes in a user and multiple repos that are sorted and top 4 are displayed. This is only if it is defined.
    const top = (repoList) => {
      if (repoList === undefined) {
        return;
      } else {
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
        const sortedRepoList = repoList.sort(sortByHighestForkStar);
  
        // Slice the list to get the first 4 elements.
        return sortedRepoList.slice(0, 3);
      }
    }
  
    const top4 = top(requestAPIResult.repos)
    // Check that requestAPIResult.user (user information) is defined before display. Could also check if requestAPIResult.repo is there as well.
    return (
      <div>
        <SearchInput setInput={setInput} input={input} setAPIResult={setAPIResult} darkMode={darkMode} />
        {requestAPIResult.user && <DisplayUserRepo user={requestAPIResult.user} repos={requestAPIResult.repos} darkMode={darkMode} top={top4} />}
      </div>
    );
  }