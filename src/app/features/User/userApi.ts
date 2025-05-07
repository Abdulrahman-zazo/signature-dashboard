// import { createApi } from '@reduxjs/toolkit/query/react'
// import { AxiosInstance } from '../../../api/axiosConfig'

// // 1. إنشاء base query مخصص باستخدام Axios
// const axiosBaseQuery = () =>
//   async ({ url, method, data ,headers }) => {
//     try {
//       const result = await AxiosInstance({
//         url,
//         method,
//         data,
//         headers: { 'Content-Type': 'application/json' }
//       })
//       return { data: result.data }
//     } catch (axiosError) {
//       return {
//         error: {
//           status: axiosError.response?.status,
//           data: axiosError.response?.data || axiosError.message
//         }
//       }
//     }
//   }

// // 2. إنشاء API service
// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: axiosBaseQuery(),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: 'auth/dashboard/login', // يمكن استخدام الثابت LOGIN هنا
//         method: 'POST',
//         data: credentials
//       }),
//       // تحويل الاستجابة إذا لزم الأمر
//       transformResponse: (response) => {
//         // افترض أن الاستجابة تأتي بالشكل { user: {}, token: '' }
//         localStorage.setItem('token', response.token)
//         return response.user
//       }
//     }),
//   }),
// })

// // 3. تصدير ال hooks
// export const { useLoginMutation } = userApi
