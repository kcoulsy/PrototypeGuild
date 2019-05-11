import React from 'react'
import './styles.scss';

const media = [
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr01/original-9161-1439317330-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr08/original-1654-1439317465-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",		
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr08/original-13354-1439321173-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr04/original-25740-1439321209-5.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr08/original-9292-1439319916-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr05/original-6710-1439319334-17.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr02/original-16901-1439320287-3.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr04/original-29345-1439321306-8.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/15/enhanced/webdr15/original-20286-1439320376-10.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr02/original-6989-1439317507-15.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr11/original-8867-1439317446-6.jpg?downsize=715:*&output-format=auto&output-quality=auto",
},
{
    name: "",
    type: 'img',
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2015-08/11/14/enhanced/webdr03/original-22498-1439319085-3.jpg?downsize=715:*&output-format=auto&output-quality=auto"
},
]

class Gallery extends React.Component {

    render() {
        return (
            <div className="gallery">
            {
                media.map((post, idx) => {
                    if (post.type === 'img') {
                        return <img src={post.url} alt={post.name} width="100%" height="auto" className="gallery-img" key={idx}/>
                    }
                })
            }
            </div>
        )
    }
}

export default Gallery;