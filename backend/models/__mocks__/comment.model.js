class Comment {
    constructor(data) {
        Object.assign(this, data);
    }
    save() {
        return Promise.resolve(this);
    }
}



Comment.create = jest.fn()
Comment.list = jest.fn()
Comment.remove = jest.fn()

module.exports = Comment;