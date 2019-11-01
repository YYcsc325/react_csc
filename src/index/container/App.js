import React from 'react';
import Silder from './main/silder/index';
import Header from './main/header/index';
import Content from './main/content/index'
import { Layout } from 'antd';
import './App.less';

function App(){
    return (
        <div className="App">
            <Layout style={{height:"100vh"}}>
                <Header />
                <Layout>
                  <Silder />
                  <Content />
                </Layout>
            </Layout>
        </div>
    )
}

export default App;
