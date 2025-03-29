import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/createUser",
        method: "POST",
        body: data,
      }),
    }),
    authUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/authUser",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser : builder.mutation({
      query : () => ({
        url: "/api/user/logout",
        method: "GET",
      })
    })
  }),
});

export const { useCreateUserMutation, useAuthUserMutation,useLogoutUserMutation } = userApiSlice;
