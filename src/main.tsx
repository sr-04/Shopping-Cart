import ReactDOM from 'react-dom'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client = {client}>
        <App />
    </QueryClientProvider>, 
    document.getElementById('root')
);
