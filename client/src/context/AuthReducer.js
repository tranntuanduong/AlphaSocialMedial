import { USER } from '../constant';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case 'LOGIN_SUCCESS': {
            localStorage.setItem(USER, JSON.stringify(action.payload));
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        }

        case 'LOGIN_FAILURE':
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };

        case 'FOLLOW': {
            const user = {
                ...state.user,
                followings: [...state.user.followings, action.payload],
            };
            localStorage.setItem(USER, JSON.stringify(user));
            return {
                ...state,
                user: user,
            };
        }

        case 'UNFOLLOW': {
            const user = {
                ...state.user,
                followings: state.user.followings.filter(
                    (following) => following !== action.payload
                ),
            };

            localStorage.setItem(USER, JSON.stringify(user));
            return {
                ...state,
                user: user,
            };
        }

        default:
            return state;
    }
};

export default AuthReducer;
