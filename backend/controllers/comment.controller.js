import Comment from '../models/comment.model'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    const comment = new Comment(req.body)
    try {
        await comment.save()
        return res.status(200).json({
            message: "Comment created"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const list = async (req, res) => {
    try {
        const comments = await Comment.find()
        return res.status(200).json(comments)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}


const remove = async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId)
        if (!comment) {
            return res.status(400).json({
                error: "Comment not found"
            })
        }
        await comment.remove()
        return res.status(200).json({
            message: "Comment deleted"
        })

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}