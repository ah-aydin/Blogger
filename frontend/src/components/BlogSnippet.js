import react from 'react';
import { Link } from 'react-router-dom';

const BlogSnippet = ({ blog }) => {
    return(
        <li>
            <Link to={`/blog/${blog.id}`}>
                <h3>{ blog.title }</h3>
                <p>{ blog.subtitle }</p>
            </Link>
        </li>
    );
}

export default BlogSnippet;