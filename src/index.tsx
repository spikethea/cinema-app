import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './store';
import reportWebVitals from './reportWebVitals';
import Film from 'routes/Film/Film';
import { Provider } from 'react-redux';
import Home from 'routes/Home/Home';

const router = createBrowserRouter([
  {
  path:"/",
  element: <Home/>
  },
  {
    path:"/preview/:movieId",
    // loader: async ({ request, params }) => {
    //   return useGetVideoByNameQuery(Number(params.movieId))
    // },
    element: <Film/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
