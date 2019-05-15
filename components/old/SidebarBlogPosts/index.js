import React from 'react'
import './styles.scss';

import Link from 'next/link';

export default ({ posts }) => {
  return (
      <div className="more-posts">
        <h2>More</h2>
      {posts.map(post => {
        return (<Link href={`/post?id=${post._id}`} key={post._id}>
            <div className="extra-post"><img src={post.imageUrl} alt={post.title} /><h4>{post.title}</h4></div>
        
        </Link>)
      })}
    </div>
  )
}
