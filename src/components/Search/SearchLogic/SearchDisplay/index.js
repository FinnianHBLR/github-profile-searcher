
export function DisplayUserRepo({ user, top }) {
    // Display user info along with a map to dispaly the top 4 repos. This could be split into more components.
    return (
      <div className={`userCard centerContainer`}>
        <div className='imageAndNameConatiner centerContainer'>
          <div className='imageContainer'>
            <img src={user.avatar_url} alt={`User display profile of ${user.name}`} />
          </div>
          <div className='nameContainer'>
            <p className='name'>Name: {user.name}</p>
            <a href={user.html_url} className='userName' rel="noopener noreferrer" target="_blank">Username: {user.login}</a>
          </div>
        </div>
        <div>
          <p className='userBio'>{user.bio}</p>
        </div>
        <div>
          <div className='followersAndrepositories'>
            <p className='userFollowers'>Followers: {user.followers}</p>
            <p className='userRepositories'>Repositories: {user.public_repos}</p>
          </div>
        </div>
        <div>
          {/* Map top4 repositories to cards. */}
          {top && top.map(repo => (<div key={repo.id}>
            <a href={repo.html_url} rel="noopener noreferrer" target="_blank">{repo.name}</a>
            <p>Forks: {repo.forks_count}</p>
            <p>Stars: {repo.stargazers_count}</p>
          </div>
          )
          )
          }
        </div>
      </div>
    )
  }