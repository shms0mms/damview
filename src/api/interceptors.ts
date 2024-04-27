import _axios, { type CreateAxiosDefaults } from "axios"

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

export const axios = _axios.create(options)
