import React from 'react';

import Link from 'next/link';

export default ({ posts }) => {
  return (
    <div className="blog-posts">
      {posts.map(post => {
        return (<Link href={`/post?id=${post._id}`} key={post._id}>
        <div className="post" >
                <img src={post.imageUrl} alt={post.title} />
                <h2><a href="">{post.title}</a></h2>
                <span className="extra-info"></span>
        </div>
        
        </Link>)
      })}
    </div>
  )
}
