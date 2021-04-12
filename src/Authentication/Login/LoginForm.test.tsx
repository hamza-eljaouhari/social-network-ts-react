import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import authenticator from "../../api/authenticate";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("should authenticate the client to the server successfully", () => {
    const credentials = {
        email: "hamza.eljaouhari.1995@gmail.com",
        password: "123456789"
    };

    const expected = { 
        user:{ 
            id: 105, 
            username: null, 
            email: "hamza.eljaouhari.1995@gmail.com"
        },
        access_token: "...token..."
    }

    mockedAxios.post.mockImplementation(() => Promise.resolve(expected));

    const response = authenticator.authenticate(credentials).then((response) => {
        return expect(response.user).toEqual(expected.user);
    });
});


test("should return http code 400 when client cannot authenticate to the server", () => {
    const credentials = {
        email: "hamza.eljaouhari.1995@gmail.com",
        password: "wrong password"
    };

    const expected = new Error("Could not get authenticated to the server, pleace try again.");

    mockedAxios.post.mockImplementation(() => Promise.reject(false));

    const response = authenticator.authenticate(credentials).catch((error) => {
        return expect(error.response.status).toEqual(400);
    });
});
