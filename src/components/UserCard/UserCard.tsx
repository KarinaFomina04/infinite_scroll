import React, {FC, memo} from 'react';
import styles from './UserCard.module.scss';
import {TUserCard} from "./types.ts";


/**
 * UserCard component to display individual user information.
 * @param {TUserCard} props - Component props.
 * @param {Object} props.user - User data object containing name, picture, and email.
 * @param {React.RefObject<HTMLDivElement>} props.measureRef - Function to observe the visibility of the component.
 * @returns {JSX.Element} The rendered component.
 */
const UserCard: FC<TUserCard> = ({ user, measureRef }) => {
    return (
        <div className={styles.card} ref={measureRef}>
            <img className={styles.cardImage} src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <div className={styles.cardName}>{user.name.first} {user.name.last}</div>
            <div className={styles.cardEmail}>{user.email}</div>
        </div>
    );
};

export default memo(UserCard);
