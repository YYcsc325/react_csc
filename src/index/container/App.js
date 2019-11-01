import React from 'react';
import './App.less';
import Silder from './main/silder/index.component';
import Header from './main/header/index.component';
import Content from './main/content/index'
import { Layout } from 'antd';

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
