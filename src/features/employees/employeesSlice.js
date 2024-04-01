// RTK
import { createSlice } from "@reduxjs/toolkit"

// Mocked data
import data from "../../__mocks__/mockedData"

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: data
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload)
      state.list.sort((a, b) => a.firstname.localeCompare(b.firstname, "en-US"))
    }
  }
})

// Selector
export const selectEmployees = state => state.employees.list

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
