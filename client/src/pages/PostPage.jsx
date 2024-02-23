import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";

const PostPage = () => {

    const {id} = useParams();

    const {userInfo} = useContext(UserContext);

    const [postInfo, setPostInfo] = useState(null)

    useEffect(() => {
        //console.log(id); // Trả về 1 string
        fetch(`http://localhost:4000/posts/${id}`)
            .then((response) => {
                response.json().then((postInfo) => {
                    setPostInfo(postInfo)
                })
            })
    }, []);

    if(!postInfo) return ''

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <a>Edit this post</a>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    )
}

export default PostPage
