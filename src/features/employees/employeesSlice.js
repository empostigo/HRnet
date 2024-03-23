// RTK
import { createSlice } from "@reduxjs/toolkit"

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: []
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload)
    },
  },
})

// Selector
export const selectEmployees = state => state.employees.list

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer