import React from 'react';
import  { Layout } from './hoc';
import  { Quiz, Header } from './containers';

function App() {
  return (
    <Layout
        header={<Header />}
    >
        <Quiz />
    </Layout>
  );
}

export default App;
