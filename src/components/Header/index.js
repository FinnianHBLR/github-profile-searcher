import { Helmet } from 'react-helmet';
import { useEffect } from 'react'

export function Header({ darkMode }) {
    useEffect(() => {
        // Update body with new background colors.
        document.documentElement.style.backgroundColor = (darkMode === true) ? "#393646" : "#fff";
    }, [darkMode]);

    return (
        <div>
            <Helmet>
                {/* Use the helment libary to set the title. */}
                <title>GitHub Profile Searcher</title>
            </Helmet>
            <h1 className={`centerContainer titleDark${darkMode}`}> GitHub Profile Searcher</h1>
        </div>
    )
}