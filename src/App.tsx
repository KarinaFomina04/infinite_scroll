import React, {  useState, useEffect, useCallback } from 'react';
import st from './App.module.scss'
import UserList from "./components/UserList";

/**
 * Main App component that manages users data and pagination.
 * @returns {JSX.Element} The rendered component.
 */

const App = () => {

    /** @type {Array<Object>} State variable to store list of users loaded from API */
    const [users, setUsers] = useState([]);

    /** @type {boolean} State variable to indicate if more users are available */
    const [hasMore, setHasMore] = useState(false);

    /** @type {boolean} State variable to indicate loading status */
    const [isLoading, setIsLoading] = useState(false);

    /** @type {number} State variable for the current page number for pagination */
    const [page, setPage] = useState(1);


    /**
     * Effect to fetch user data from API whenever the page number changes.
     * Sets loading status, appends new users, and updates `hasMore`.
     */
    useEffect(() => {
        (async () => {
            const response = await fetch(`https://randomuser.me/api/?page=${page}&results=10`);
            const data = await response.json();

            // Update the list of users and check if more data is available
            setUsers(prevUsers => [...prevUsers, ...data.results]);
            setHasMore(data.results.length > 0);
            setIsLoading(false);
        })();
    }, [page]);


    /**
     * Callback function to load more users by incrementing the page number.
     * Sets `isLoading` to true.
     */
    const loadMore = useCallback(() => {
        setPage((page) => page + 1);
        setIsLoading(true);
    }, []);

    return (
        <div className={st.appCards}>
            <h1>Client data</h1>
            <UserList
                users={users}
                loadMore={loadMore}
                hasMore={hasMore}
                isLoading={isLoading}
            />
        </div>
    );
}

export default App;
