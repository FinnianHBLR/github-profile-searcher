export function SearchInput({ setInput, input, setAPIResult }) {
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
  
        if (userJSONData.message === "Not Found") {
          alert("Sorry, could not find user!")
        } else {
          // Set both repo and user data using the setAPIResult passed in. Must be set at the same time.
          setAPIResult({ repos: repoJSONData, user: userJSONData });
        }
      }
    }
  
    // Define the form. This could be its own component if need be. value={input} refrences the current state of the input.
    return (
      <div className='centerForm'>
        <form onSubmit={requestGitHubAPI}>
          <input className='formInput' type="text" onChange={handleInput} value={input} placeholder='Enter GitHub profile...' />
          <div className='centerContainer'>
            <input className='formSubmitBtn' type="submit" value="Search GitHub!" />
          </div>
        </form>
      </div>
    )
  }