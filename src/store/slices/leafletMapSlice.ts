import { createSlice } from '@reduxjs/toolkit';

export interface PositionCoordsState {
  latitude: number;
  longitude: number;
  popupIsOpen: boolean;
}

const initialState: PositionCoordsState = {
  latitude: 51.2398657,
  longitude: -0.612081,
  popupIsOpen: false,
};

export const leafletMapSlice = createSlice({
  name: 'leaflet',
  initialState,
  reducers: {
    locatePosition: (state: PositionCoordsState, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
    },

    togglePopup: state => {
      state.popupIsOpen = !state.popupIsOpen;
    },

    openPopup: state => {
      state.popupIsOpen = true;
    },
  },
});

export const { locatePosition, togglePopup, openPopup } =
  leafletMapSlice.actions;

export default leafletMapSlice.reducer;
