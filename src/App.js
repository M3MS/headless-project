import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import './App.scss';
import Home from './Pages/Home';
import Menus from './Menus/Menus';
import SingleMenu from './Menus/Menu';
import Header from './Components/Header/Header'

const client = new ApolloClient({
  uri: 'https://blocklabs.test/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/:slug" element={<SingleMenu />} />
        </Routes>
      </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
