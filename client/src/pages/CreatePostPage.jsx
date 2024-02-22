//npm i react-quill
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const CreatePostPage = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const [redirect, setRedirect] = useState(false);

    const cretateNewPost = async(e) => {
        // vì phải gửi cả ảnh nên thay vì gửi data dưới dạng JSON như bình thường , ta sẽ gửi dưới dạng Form Data;
        const data = new FormData(); // Xem ở Payload Network khi ta bấm gửi Data
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]); // do ở dạng List nên ta muốn chỉ chọn bức ảnh đầu tiên kể cả khi ta chọn nhiều
        e.preventDefault();
        const response = await fetch('http://localhost:4000/posts', {
            method: 'POST',
            body: data,
        });
        //console.log('Info of Image or Post: ', await response.json()); // muốn xem ở console thì ta phải để ở dạng json
        //console.log(files);
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={cretateNewPost}>
            <input 
                type="text" 
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            <input 
                type="text" 
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}/>
            <input 
                type="file" 
                //value={files} -> Không được để value chỗ này vì nó sẽ báo lỗi
                onChange={(e) => setFiles(e.target.files)}/>
            <ReactQuill 
                value={content} 
                onChange={newValue => setContent(newValue)}
                modules={modules} 
                formats={formats}/>
            <button style={{marginTop: '5px'}}>Create Post</button>
        </form>
    )
}

export default CreatePostPage
