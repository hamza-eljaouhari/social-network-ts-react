import React from 'react';
import { render, screen } from '@testing-library/react';
import postsApi from "../api/posts";
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.create = jest.fn(() => mockedAxios);

test("should create a new account for the client", () => {

    const expected = {
        user: {
            id: 10,
            email: "vel.mauris.Integer@facilisis.net",
            username: "5697050B-01FA-18C8-9A2E-42FFDFBF1417"
        },
        posts_count: 1,
        posts: [
            [
                {
                    id: 25,
                    title: "Proin velit. Sed malesuada augue ut lacus.",
                    created_at: "2021-01-29T04:26:09.000Z",
                    updated_at: "2022-02-17T09:23:33.000Z",
                    community_id: 7,
                    owner_id: 13,
                    createdAt: "2021-01-29T04:26:09.000Z",
                    updatedAt: "2022-02-17T09:23:33.000Z",
                }
            ]
        ]
    };
    mockedAxios.post.mockImplementationOnce(() => {
        return Promise.resolve(expected);
    });

    postsApi.getAllPosts().then((response) => {
        expect(response).toEqual(expected);
        expect(mockedAxios.post).toHaveBeenCalledWith('/user/feed');
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    })

});