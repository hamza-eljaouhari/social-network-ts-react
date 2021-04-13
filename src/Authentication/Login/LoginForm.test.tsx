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

    authenticator.authenticate(user).then((response) => {
        expect(response).toEqual(expected);
        expect(mockedAxios.post).toHaveBeenCalledWith(user);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

});


test("should throw http code 401 when password or email are wrong", () => {
    const user = {
        email: "hamza.eljaouhari.1995@gmail.com",
        password: "wrong password",
    };

    const expected = {
        status: 401,
        message: "Wrong email or password"
    }

    mockedAxios.post.mockImplementationOnce(() => {
        return Promise.reject(expected);
    });

    authenticator.authenticate(user).catch((error) => {
        expect(error.status).toEqual(expected.status);
        expect(error.message).toEqual(expected.message);
        expect(mockedAxios.post).toHaveBeenCalledWith("/user/signin", user);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

});



