export type TUserCard = {
    user : TUser;
    measureRef : (node) => void;
}

export type TUser = {
    picture: {
        large: string;
    }
    name: {
        first: string;
        last: string;
    }
    email: string;
    login: {
        uuid: string
    }
}