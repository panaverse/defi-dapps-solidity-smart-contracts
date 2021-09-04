import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type listType = {
    count: number,
    todos: {
    id: string,
    content: string,
    completed: boolean,
    }[]
} | null


export type StateType = {
    todos: null | listType
}
const initialState: StateType = {
    todos: null
}


const todoListSlice = createSlice({
    name: "ToDos",
    initialState,
    reducers: {
        setTodo: (state, { payload }: PayloadAction<any>) => {            
            state.todos = payload
            //console.log("state.todos", state.todos?.todos)            
        },        
        addTodo: (state, { payload }: PayloadAction<any>) => {
            if (state.todos) {
                state.todos.count += 1;
                const arr = [...state.todos.todos]                
                arr.push(payload)                               
                state.todos = { ...state.todos, todos: arr }
                //console.log("added ", state.todos.todos)
            }            
        },
        deleteTodo: (state, { payload }: PayloadAction<any> ) => {            
            if (state.todos) {
                //console.log("task to delete ", payload)
                const arr =  state.todos.todos.filter(item => item.id !== payload)
                state.todos = { ...state.todos, todos: arr };
                state.todos.count--;
                //console.log("deleted ", state.todos)
            }
        },
        updateTodo: (state, { payload }: PayloadAction<any> ) => {
            if (state.todos) {
                //console.log("task to update ", payload)
                const arr = [...state.todos.todos]
                arr.map(item => item.id === payload ? item.completed = true : null )
                state.todos = { ...state.todos, todos: arr }
                //console.log("update ", state.todos)
            }
        },                       
    },
});

export default todoListSlice.reducer
export const { setTodo, addTodo, deleteTodo, updateTodo } = todoListSlice.actions