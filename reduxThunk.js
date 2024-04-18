export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await makeAPiCall();
      const data = await response.json();
      dispatch({type: "DATA", payload: data})
    } catch (error) {
      dispatch({type: FETCH_DATA_ERROR, payload: error})
    }

  }
}


// In componet how to use this 

dispatch(fetchData())

// Basically this fetchData is the thunk action creator which return a function that dispatches the action accordingly

// reducerFunction - pure function to do the mutation on state values as state values are read only can only be chnaged by reducer function 

toggleValue: (state, payload) => {
  state.isMenuOpen = !state.isMenuOpen
}






//  RTK Query
// It is a basically data fetching and caching which is a part of Redux tool kit
// It has many benifits and it's simpler to use.
  // 1. Automatic caching the api resposne which help in reduction in unnecessary api calls
  // 2. Normalized store - Automatically store the api response in the normalized form in redux store
// We get createApi methods from redux tool kit which help in creating the apiSlice

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: ''});
  endpoints: (builder) => {
    fetchData: builder.query({
      query: () => "/endpoint"
    }),
    postData: builder.mutation({
      query: (initialPost) => {
        url: "",
        method: "",
        body: initialPost
      }
    })
  }
})

