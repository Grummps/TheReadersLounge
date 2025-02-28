import BookClub from '../models/bookClub.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    const bookClub = new BookClub(req.body)
    try {
        await bookClub.save()
        return res.status(200).json({
            message: "Book club created"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const list = async (req, res) => {
    try {
        const bookClubs = await BookClub.find()
        return res.status(200).json(bookClubs)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}