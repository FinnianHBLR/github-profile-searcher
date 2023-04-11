import { Helmet } from 'react-helmet';

export function Header() {
    return (
        <div>
            <Helmet>
                {/* Use the helment libary to set the title. */}
                <title>GitHub Profile Searcher</title>
            </Helmet>
            <h1 className={`centerContainer`}> GitHub Profile Searcher</h1>
        </div>
    )
}