import { createSlice } from "@reduxjs/toolkit";

export const paginationObjectTemplate = {
	model: [],
	currentPage: 0,
	totalPages: 0,
	totalElements: 0,
	page: 1,
	size: 10,
	isActive: true
}

export const paginationSlice = createSlice({
	name: 'pagination',

	initialState: {
		demo: paginationObjectTemplate
	},

	reducers: {
		setPagination: (state, action) => {
			const { key, data } = action.payload;
			state[key] = data;
		},

		setIsActive(state, action) {
			const { key, isActive } = action.payload;
			state[key].isActive = isActive;
		}
	}
})

const { reducer: paginationReducer, actions } = paginationSlice;
export const { setPagination, setIsActive } = actions;
export default paginationReducer;