import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => 'users',
            providesTags: (result) => 
                result ? result.map(({ id }) => ({ type: 'Users', id })) : [],
        }),
        getUser: build.query<void, string>({
            query: (id) => ({
                url: 'users/' + id,
                method: 'GET'
            }),
        }),
        addUser: build.mutation<User, Partial<User>>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: build.mutation<void, string>({
            query: (id) => ({
                url: 'users/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users']
        })
    }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation, useDeleteUserMutation } = api;

export const { endpoints, reducerPath, reducer, middleware} = api;