import React from 'react';
import ReactLoading from 'react-loading';
import '../App.css';

const Loading = ({type, color}) => (
        <ReactLoading type={type} color={color} height={'10%'} width={'10%'} className="Loader"/>
);

export default Loading;
