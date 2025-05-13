// tagTypes: ['Posts'],

// getPosts: builder.query({
//   query: () => '/posts',
//   providesTags: (result = []) =>
//     result.map(({ id }) => ({ type: 'Posts' as const, id })).concat({ type: 'Posts', id: 'LIST' }),
// }),

// addPost: builder.mutation({
//   query: (newPost) => ({
//     url: '/posts',
//     method: 'POST',
//     body: newPost,
//   }),
//   invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
// }),

// updatePost: builder.mutation({
//   query: ({ id, ...patch }) => ({
//     url: `/posts/${id}`,
//     method: 'PATCH',
//     body: patch,
//   }),
//   invalidatesTags: (_res, _err, { id }) => [{ type: 'Posts', id }],
// }),

// deletePost: builder.mutation({
//   query: (id) => ({
//     url: `/posts/${id}`,
//     method: 'DELETE',
//   }),
//   invalidatesTags: (_res, _err, id) => [{ type: 'Posts', id }, { type: 'Posts', id: 'LIST' }],
// }),
const add = {
  id: 151,
  classification_id: 1,
  type: "property",
  date: "2025-04-26 22:38:46",
  user_information: {
    id: 3,
    first_name: "عبد السميع",
    last_name: "المجالي",
    email: "sami.abulebbeh@example.org",
    phone_number: "1-458-550-1838",
    address: {
      country: {
        id: 1,
        name: "روسيا البيضاء",
      },
      city: {
        id: 1,
        name: "الحصن",
      },
      region: {
        id: 3,
        name: "region30",
      },
      secondary_address: "7410 شارع ميريت الشريف\nغرب مرج الحمام",
    },
    image_url: "https://via.placeholder.com/640x480.png/00dd77?text=voluptatem",
  },
  advertisement: {
    id: 151,
    serial_number: "P_4392981",
    advertisement_id: 151,
    area: 100,
    price: 1500000,
    price_history: {
      price: 1500000,
      history: 2250000,
    },
    publication_type: "sale",
    rent_type: " ",
    address: {
      country: {
        id: 2,
        name: "مدغشقر",
      },
      city: {
        id: 5,
        name: "جرش",
      },
      region: {
        id: 1,
        name: "region43",
      },
      secondary_address: "test secondary address",
    },
    ownership_type: {
      id: 5,
      name: "وصاية",
    },
    main_category: {
      id: 1,
      name: "سكني ",
    },
    sub_category: {
      id: 2,
      name: "منزل",
    },
    age: 2,
    pledge_type: {
      id: 1,
      name: "عادي",
    },
    rooms_number: "3",
    rooms: [
      {
        id: 511,
        type: {
          id: 1,
          name: "صالون",
        },
        number: 1,
      },
      {
        id: 512,
        type: {
          id: 2,
          name: "معيشة",
        },
        number: 1,
      },
      {
        id: 513,
        type: {
          id: 3,
          name: "نوم",
        },
        number: 1,
      },
      {
        id: 514,
        type: {
          id: 4,
          name: "مطبخ",
        },
        number: 1,
      },
      {
        id: 515,
        type: {
          id: 5,
          name: "حمام",
        },
        number: 1,
      },
    ],
    directions: [
      {
        id: 1,
        title: "شرقي",
      },
    ],
    features: [
      {
        id: 1,
        name: "سور خارجي",
      },
      {
        id: 3,
        name: "مسبح",
      },
    ],
    rating: 0,
    detailed_attributes: [
      {
        key: "levels count",
        value: "2",
      },
    ],
    medias_url: [
      "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/3.jpg",
      "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/4.jpg",
      "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/6.jpg",
      "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/outside/home/1.jpg",
      "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/planing/2.jpg",
    ],
    medias: [
      {
        id: 309,
        type: "jpg",
        size: 33934,
        url: "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/3.jpg",
      },
      {
        id: 310,
        type: "jpg",
        size: 10900,
        url: "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/4.jpg",
      },
      {
        id: 311,
        type: "jpg",
        size: 96855,
        url: "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/inside/6.jpg",
      },
      {
        id: 312,
        type: "jpg",
        size: 34273,
        url: "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/outside/home/1.jpg",
      },
      {
        id: 313,
        type: "jpg",
        size: 19549,
        url: "https://code.signaturebackend.abdulrahmanzazo.com/property_image_fake/flatAndHome/planing/2.jpg",
      },
    ],
  },
};
