import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    useEffect(() => {
        console.log('Hello World 111');
    }, []);

    return <h1>Hello World</h1>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
