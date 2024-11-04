import React, {FC, useEffect} from 'react';
import st from "./UserList.module.scss";
import UserCard from "../UserCard/UserCard.tsx";
import useOnScreen from "../../hooks/useOneScreen.ts";
import {TUserList} from "./types.ts";


/**
 * UserList component that renders a list of users and loads more when user reaches the end.
 * @param {TUserList} props Component props, including users, loading status, and loading function.
 * @returns {JSX.Element} The rendered component.
 */
const UserList:FC<TUserList> = ({
    hasMore,
    isLoading,
    loadMore,
    users
}) => {

    /**
     * Custom hook to determine if the last user card is visible on the screen.
     * `measureRef` is a ref attached to the last user card to detect its visibility.
     */
    const { measureRef, isIntersecting, observer } = useOnScreen();


    /**
     * Effect to trigger `loadMore` when the last user card is visible and more users are available.
     * Disconnects the observer to prevent multiple triggers.
     */
    useEffect(() => {
        if (isIntersecting && hasMore) {
            loadMore();
            if (observer) {
                observer.disconnect();
            }
        }
    }, [isIntersecting, hasMore, loadMore]);

    return (
        <>
            <div className={st.userList}>
                {users.map((user, index) => {
                    if (index === users.length - 1) {
                        return (
                            <div key={user.login.uuid}>
                                <UserCard user={user} measureRef={measureRef}/>
                            </div>)
                    }
                    return <div key={user.login.uuid}>
                        <UserCard user={user}/>
                    </div>
                })}
            </div>
            {isLoading && <p>Loading...</p>}
        </>
    );
};

export default UserList;
