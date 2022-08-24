import { ApolloProvider } from '@apollo/client';
import './App.css';
import client from './client';
import DisplayData from './components/DisplayData';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
