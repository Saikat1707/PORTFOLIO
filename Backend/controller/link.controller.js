const linkModel = require('../models/links.models')

const getAllLinks = async (req, res) => {
    try {
        const links = await linkModel.find();
        return res.status(200).json({
            message: 'Fetched all links successfully',
            data: links
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching links',
            error: error.message
        });
    }
};

const getLinkByNameAndUpdate = async (req, res) => {
    try {
        const { title, url } = req.body;
        const id = req.params.id;
        if (!title || !url) {
            return res.status(400).json({
                message: 'Title and URL are required'
            });
        }

        const linkData = await linkModel.findByIdAndUpdate(
            { id },
            { title , url },
            { new: true } 
        );

        if (!linkData) {
            return res.status(404).json({
                message: 'Link not found'
            });
        }

        return res.status(200).json({
            message: 'Link updated successfully',
            data: linkData
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating link',
            error: error.message
        });
    }
};

const createLink = async (req , res)=>{
    const {title , url} = req.body
    if(!title || !url) return res.status(400).json({message: 'Title and URL are required'})
    const existingLink = await linkModel.findOne({title})
    if(existingLink) return res.status(400).json({message: 'Link already exists'})
    const linkData = await linkModel.create({
        title,
        url
    })

    if(!linkData) return res.status(400).json({message: 'Error creating link'})
    return res.status(200).json({
        message: 'Link created successfully',
        data: linkData
    })
}

const deleteLink = async (req , res)=>{
    const id = req.params.id ;
    if(!id) return res.status(400).json({message: 'ID is required'})
    const linkData = await linkModel.findByIdAndDelete(id)
    if(!linkData) return res.status(400).json({message: 'Error deleting link'})
    return res.status(200).json({
        message: 'Link deleted successfully',
        data: linkData
    })
}
const getSingleLink = async (req,res)=>{
    const id = req.params.id;
    if(!id) return res.status(400).json({message: 'ID is required'})

    const linkData = await linkModel.findById(id);
    if(!linkData) return res.status(400).json({message:'can not get the link data'});

    return res.status(200).json({
        message: 'Link fetched successfully',
        data: linkData
    })
}
module.exports = {
    getAllLinks,
    getLinkByNameAndUpdate,
    createLink,
    deleteLink,
    getSingleLink
};
