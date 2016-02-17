import { expect } from 'chai';
import reducer from '../../../src/static/reducers/auth';
import * as TYPES from '../../../src/static/constants';

describe('Auth Reducers Tests', () => {
    it('should handle LOGIN_USER_REQUEST', () => {
        const reducerResponse = reducer([], {
            type: TYPES.AUTH_LOGIN_USER_REQUEST
        });
        expect(reducerResponse).to.eql({
            isAuthenticating: true,
            statusText: null
        });
    });

    it('should handle AUTH_LOGIN_USER_SUCCESS', () => {
        const reducerResponse = reducer([],
            {
                type: TYPES.AUTH_LOGIN_USER_SUCCESS,
                payload: {
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFAYS5jb20iLCJleHAiOjE0NTI5NjA3N' +
                    'TUsInVzZXJfaWQiOjEsImVtYWlsIjoiYUBhLmNvbSJ9.RrJJ63OyWaZIPSmgS8h_vZyrPo0TV9SXvT_5HJhNKpMunJoY' +
                    '76GKQ9xyjI27vlir0pA61j0X-j-Wk2phDDk39w'
                }
            }
        );
        expect(reducerResponse).to.eql(
            {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFAYS5jb20iLCJleHAiOjE0NTI5NjA3NTUs' +
                'InVzZXJfaWQiOjEsImVtYWlsIjoiYUBhLmNvbSJ9.RrJJ63OyWaZIPSmgS8h_vZyrPo0TV9SXvT_5HJhNKpMunJoY76GKQ9x' +
                'yjI27vlir0pA61j0X-j-Wk2phDDk39w',
                userName: 'a@a.com',
                isAuthenticating: false,
                isAuthenticated: true,
                statusText: 'You have been successfully logged in.'
            }
        );
    });

    it('should handle AUTH_LOGIN_USER_FAILURE', () => {
        const reducerResponse = reducer([],
            {
                type: TYPES.AUTH_LOGIN_USER_FAILURE,
                payload: {
                    status: '401',
                    statusText: 'something happen'
                }
            }
        );
        expect(reducerResponse).to.eql({
            token: null,
            userName: null,
            isAuthenticating: false,
            isAuthenticated: false,
            statusText: 'Authentication Error: 401 something happen'
        });
    });

    it('should handle AUTH_LOGOUT_USER', () => {
        const reducerResponse = reducer([
            {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFAYS5jb20iLCJleHAiOjE0NTI5NjA3NTUsIn' +
                'VzZXJfaWQiOjEsImVtYWlsIjoiYUBhLmNvbSJ9.RrJJ63OyWaZIPSmgS8h_vZyrPo0TV9SXvT_5HJhNKpMunJoY76GKQ9xyjI2' +
                '7vlir0pA61j0X-j-Wk2phDDk39w',
                userName: 'a@a.com',
                isAuthenticating: false,
                isAuthenticated: true,
                statusText: 'You have been successfully logged in.'
            }

        ], {
            type: TYPES.AUTH_LOGOUT_USER
        });

        expect(reducerResponse).to.eql({
            0: {
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFAYS5jb20iLCJleHAiOjE0NTI5NjA3NTUsI' +
                'nVzZXJfaWQiOjEsImVtYWlsIjoiYUBhLmNvbSJ9.RrJJ63OyWaZIPSmgS8h_vZyrPo0TV9SXvT_5HJhNKpMunJoY76GKQ9xyj' +
                'I27vlir0pA61j0X-j-Wk2phDDk39w',
                userName: 'a@a.com',
                isAuthenticating: false,
                isAuthenticated: true,
                statusText: 'You have been successfully logged in.'
            },
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been successfully logged out.'

        });
    });
});
