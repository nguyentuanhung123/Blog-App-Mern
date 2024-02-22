import {format, formatISO9075} from 'date-fns';

const Post = ({title, summary, cover, content, createdAt, author}) => {
    return (
        <div className='post'>
            <div className="image">
              <img src={'http://localhost:4000/'+cover} alt=""/>
            </div>
            <div className="texts">
              <h2>{title}</h2>
              <p className="info">
                <span className="author">{author.username}</span>
                {/* 2024-02-22 18:07:16 */}
                <time>{formatISO9075(new Date(createdAt))}</time>
                {/* Feb 22, 2024 18:07 */}
                {/* <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time> */}
              </p>
              <p className='summary'>{summary}</p>
            </div>
        </div>
    )
}

export default Post
