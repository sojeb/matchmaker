import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "../reducers/user.reducers";
import menuReducer from "../reducers/menu.reducers";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import companyReducers from '../reducers/company.reducers';
import paginationReducer from "../reducers/paginate.reducers";
import thunk from "redux-thunk";
import roomReducers from '../reducers/room.reducers';
import storeReducers from '../reducers/store.reducers';
import rackReducers from '../reducers/rack.reducers';
import aircraftReducers from '../reducers/aircraft.reducers';
import rackRowReducers from "../reducers/rackRow.reducers";
import rackRowBinReducers from "../reducers/RackRowBin.reducers";
import externalserviceReducers from "../reducers/externalservice.reducers";
import locationReducers from "../reducers/location.reducers";
import cityReducers from "../reducers/city.reducers";
import aircraftModelFamilyReducers from "../reducers/aircraftModelFamily.reducers";
import countryReducers from '../reducers/country.reducers';
import workflowReducers from "../reducers/workflowReducers";
const persistConfig = {
	key: 'root',
	storage
};

const reducer = combineReducers({
	user: userReducer,
	companies:companyReducers,
	menu: menuReducer,
	pagination: paginationReducer,
	stores:storeReducers,
	rooms:roomReducers,
	racks:rackReducers,
	aircrafts:aircraftReducers,
	aircraftModelFamilies:aircraftModelFamilyReducers,
	rackrow:rackRowReducers,
	rackrowBin:rackRowBinReducers,
	externaldept:externalserviceReducers,
	locations:locationReducers,
	cities:cityReducers,
	countries:countryReducers,
	workflow:workflowReducers,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [ thunk ]
})

export default store;