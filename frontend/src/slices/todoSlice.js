import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ userId }) => ({
        url: "api/todos/getTodos",
        params: { userId },
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `api/todos/${id}`,
        method: "DELETE",
      }),
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: "api/todos/createTodo",
        method: "POST",
        body: data,
      }),
    }),
    getTodoById: builder.query({
      query: (id) => ({
        url: `/api/todos/getTodoById`,
        method: "GET",
        params: { id },
      }),
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: "/api/todos/updateTodo",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todoApiSlice;
