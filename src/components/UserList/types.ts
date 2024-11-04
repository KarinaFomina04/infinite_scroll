import {TUser} from "../UserCard/types.ts";

export type TUserList = {
    hasMore: boolean,
    isLoading: boolean,
    loadMore : () => void,
    users: TUser[]
}