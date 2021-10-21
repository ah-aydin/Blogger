import react from 'react';
import { Link } from 'react-router-dom';

const BlogSnippet = ({ blog }) => {
    return (
        <li>
            <Link to={`/blog/${blog.id}`} className='card mb-3' style={{textDecoration: 'none'}}>
                <div className='card-body'>
                    <div className='row'>
                        <h5 className='col-md-6 card-title'>{blog.title}</h5>
                        <h6 className='col-md-6 text-secondary text-end'>
                            Author: 
                            <Link className='text-primary ms-3' to={`/account/${blog.author_id}`} style={{textDecoration: 'none'}}>
                                {blog.author_name} {blog.author_last_name}
                            </Link>
                        </h6>
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">{blog.subtitle}</h6>
                </div>
            </Link>
        </li>
    );
}

export default BlogSnippet;