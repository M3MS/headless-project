import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import './App.scss';
import Home from './Pages/Home';
import Menus from './Menus/Menus';
import SingleMenu from './Menus/Menu';

const client = new ApolloClient({
  uri: 'https://blocklabs.test/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <div className="content">
        <h1>28 Market Place</h1>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menu/:slug" element={<SingleMenu />} />
        </Routes>
      </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
