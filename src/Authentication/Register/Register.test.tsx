import React from 'react';
import { render, screen } from '@testing-library/react';
import authenticator from "../../api/authenticate";
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

test("should create a new account for the client", async () => {
    const user = {
        email: "hamza.eljaouhari.1995@gmail.com",
        password: "123456789",
        username: "username"
    };

    const expected = {
        user: { 
            id :110,
            username: "administrator",
            email: "hamza.eljaouhari.1995@gmail.com"
        },
        access_token: "token"
    }

    mockedAxios.post.mockImplementationOnce(() => {
        return Promise.resolve(expected);
    });

    authenticator.register(user).then((response) => {
        expect(response).toEqual(expected);
        expect(mockedAxios.post).toHaveBeenCalledWith(user);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

});