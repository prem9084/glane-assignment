// src/api/api.js

import { axiosInstance } from "./axiosInstance";

export const api = {
  getListings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const res = await axiosInstance.get(
      `/listning/search-listing${queryString ? `?${queryString}` : ""}`
    );
    return res.data;
  },

  getBookings: async () => {
    const res = await axiosInstance.get("/booking/get-bookings");
    return res.data;
  },

  getHostListings: async () => {
    const res = await axiosInstance.get("/listning/get-all");
    return res.data;
  },

  getHostBookings: async () => {
    const res = await axiosInstance.get("/booking/host/booking");
    return res.data;
  },

  createBooking: async (data) => {
    const res = await axiosInstance.post("/booking/bookings", data);
    return res.data;
  },

  createListing: async (data) => {
    const res = await axiosInstance.post("/listning/add-listing", data);
    return res.data;
  },

  login: async (credentials) => {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await axiosInstance.post("/auth/register", userData);
    return res.data;
  },
};
