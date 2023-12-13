const mongoose = require('mongoose')
const Movie = require('../models/Movie')

const index = async (req, res) => {
    const movies = await Movie.find({}).sort({ createdAt: -1 }) //descending order
    res.status(200).json(movies)
}

const create = async (req, res) => {
    const { title, genre, year } = req.body

    try {
        const movie = await Movie.create({ title, genre, year })
        res.status(200).json(movie)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const show = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const movie = await Movie.findById(id)
    if (!movie) {
        return res.status(404).json({ error: 'Movie with this ID does not exist!' })
    }
    res.status(200).json(movie)
}

const destroy = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const movie = await Movie.findOneAndDelete({ _id: id })
    if (!movie) {
        return res.status(400).json({ error: 'Movie with this ID does not exist!' })
    }
    res.status(200).json(movie)
}

const update = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This ID is not valid' })
    }

    const movie = await Movie.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!movie) {
        return res.status(400).json({ error: 'Movie with this ID does not exist!' })
    }
    res.status(200).json(movie)
}

module.exports = {
    index,
    create,
    show,
    destroy,
    update
}
