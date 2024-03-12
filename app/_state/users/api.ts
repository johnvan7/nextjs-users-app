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
        addUser: build.mutation<User, {user: Partial<User>, token: string}>({
            query: (args) => ({
                url: 'users',
                method: 'POST',
                headers: {Authorization: `Bearer ${args.token}`},
                body: args.user,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: build.mutation<void, {userId: string, token: string}>({
            query: (args) => ({
                url: 'users/' + args.userId,
                method: 'DELETE',
                headers: {Authorization: `Bearer ${args.token}`},
            }),
            invalidatesTags: ['Users']
        })
    }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation, useDeleteUserMutation } = api;

export const { endpoints, reducerPath, reducer, middleware} = api;