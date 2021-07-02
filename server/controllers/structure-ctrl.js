const Structure = require('../models/structure-model')

createStructure = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a structure',
        })
    }

    const newstructure = new Structure(body);


    await Structure.findOne({ key:newstructure.key }, (err, structure) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (structure) {
            return res
                .status(400)
                .json({ success: false, error: `Structure key not unique` })
        }
        

        newstructure
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    key: newstructure.key,
                    message: 'Structure created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Structure not created!',
                })
            })

        }).catch(err => console.log(err))

    
}

updateStructure = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Structure.findOne({ key: req.params.key }, (err, structure) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Structure not found!',
            })
        }
        structure.name = body.name
        structure.time = body.time
        structure.rating = body.rating
        structure
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: structure._id,
                    message: 'Structure updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Structure not updated!',
                })
            })
    })
}

deleteStructure = async (req, res) => {
    await Structure.findOneAndDelete({ _id: req.params.id }, (err, structure) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!structure) {
            return res
                .status(404)
                .json({ success: false, error: `Structure not found` })
        }

        return res.status(200).json({ success: true, data: structure })
    }).catch(err => console.log(err))
}

getStructureByKey = async (req, res) => {
    await Structure.findOne({ key: req.params.key }, (err, structure) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!structure) {
            return res
                .status(404)
                .json({ success: false, error: `Structure not found` })
        }
        return res.status(200).json({ success: true, data: structure })
    }).catch(err => console.log(err))
}

getStructures = async (req, res) => {
    await Structure.find({}, (err, structures) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!structures.length) {
            return res
                .status(404)
                .json({ success: false, error: `Structure not found` })
        }
        return res.status(200).json({ success: true, data: structures })
    }).catch(err => console.log(err))
}

module.exports = {
    createStructure,
    updateStructure,
    deleteStructure,
    getStructures,
    getStructureByKey,
}