const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true, //giúp chúng ta có thêm biến là thời gian cập nhật (Khi nào bài đăng được tạo - createAt, updateAt) 
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;

