import React from 'react';
import { render, screen } from '@testing-library/react';
import authenticator from "../../api/authenticate";
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.create = jest.fn(() => mockedAxios);

test("should create a new account for the client", () => {

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


test("should return code 409 when email is already taken", () => {
    const user = {
        email: "hamza.eljaouhari.1995@gmail.com",
        password: "123456789",
        username: "username"
    };

    const expected = {
        message: 'This email is already taken',
        status: 409
    }

    mockedAxios.post.mockRejectedValue(expected);

    authenticator.register(user).catch((error) => {
        expect(error.message).toEqual(expected.message);
        expect(error.status).toEqual(expected.status)
        expect(mockedAxios.post).toHaveBeenCalledWith('/user/signup', user);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

});