import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
    useEffect(() => {
        console.log('Hello World 111');
    }, []);

    return(
        <div>
        <h1>Music Event Dashboard</h1>
        <p>Redux store подключен!</p>
    </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);