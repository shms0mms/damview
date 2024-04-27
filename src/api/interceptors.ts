import _axios, { type CreateAxiosDefaults } from "axios"
import { env } from "@/env"

const options: CreateAxiosDefaults = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

export const axios = _axios.create(options)
