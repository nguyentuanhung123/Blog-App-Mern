const Post = () => {
    return (
        <div className='post'>
            <div className="image">
              <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" alt=""/>
            </div>
            <div className="texts">
              <h2>Full-house battery backup coming later this year</h2>
              <p className="info">
                <span className="author">Dawid Paszko</span>
                <time>2024-01-06 16:45</time>
              </p>
              <p className='summary'>Today at its special launch event, ...</p>
            </div>
        </div>
    )
}

export default Post
