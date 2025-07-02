import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../api/axiosBaseQuery";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        // GET all users
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        // GET single user by ID
        getUserById: builder.query<User, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Users", id }],
        }),

        // CREATE new user
        addUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: "/user",
                method: "POST",
                data: newUser,
            }),
            invalidatesTags: ["Users"],
        }),

        // UPDATE user
        updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: ["Users"],
        }),

        // DELETE user
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
