import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const img_1="https://picsum.photos/200/300";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
    <App />
    
        <p>Hello World!</p>
        
        <h2 className='bg-info text-primary'>Hello Delhi</h2>
        <h3 style={{ backgroundColor: "grey", marginTop: "10px" }}>Hello India</h3>
        <div className=' d-flex '>
        <img src={img_1} alt="image" className='mx-2'/>
        <img src={img_1} alt="image" className='mx-2'/>
        <img src={img_1} alt="image" className='mx-2'/>
        <img src={img_1} alt="image" className='mx-2'/>
        </div>
        <Button variant="primary">click me</Button>        


    </>
);



