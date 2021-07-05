const Structure = require('../models/structure-model')

createStructure = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Rezume',
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
                .json({ success: false, error: `Rezume name not unique` })
        }
        

        newstructure
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    key: newstructure.key,
                    message: 'Rezume created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Rezume not created!',
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
                message: 'Rezume not found!',
            })
        }
        structure.rowdata = body.rowdata;
        structure
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    key: structure.key,
                    message: 'Rezume updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Rezume not updated!',
                })
            })
    })
}

deleteStructure = async (req, res) => {
    await Structure.findOneAndDelete({ key: req.params.key }, (err, structure) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!structure) {
            return res
                .status(404)
                .json({ success: false, error: `Rezume not found` })
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
                .json({ success: false, error: `Rezume not found` })
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
                .json({ success: false, error: `Rezume not found` })
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