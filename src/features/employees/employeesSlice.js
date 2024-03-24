// RTK
import { createSlice } from "@reduxjs/toolkit"

// Mocked data
import data from "../../__mocks__/mockData"

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: data
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
