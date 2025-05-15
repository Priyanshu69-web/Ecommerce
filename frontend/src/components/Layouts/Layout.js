import React from 'react';
import Header from './Header';
import {Helmet} from 'react-helmet';
import {Toaster} from 'react-hot-toast';
const Layout =({children,title,description,keywords,author})=>{
    return(
        <>
        <Helmet>
            <meta charSet="utf-8"></meta>
            <meta name="description" content={description}></meta>
            <meta name="keywords" content={keywords}></meta>
            <meta name="author" content={author}></meta>
            <title>{title}</title>
        </Helmet>
       <Header></Header>
       <main style={{minHeight:"70vh"}}>
        <Toaster/>
        {children}
       </main>
       {/* <Footer></Footer> */}
        </>
    )
}
Layout.defaultProps ={

    title: "Ecommrece app - shop now",
    description: "mern stack project",
    keyword: "mern,react,node,mongodb",
    author: "Spiderman"
};

export default Layout;