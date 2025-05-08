const cpLinkModel = require('../models/cpLinks.models');

const getAllCpLinks = async (req , res) =>{
    const cpLinkData = await cpLinkModel.find()
    if(!cpLinkData){
        return res.status(404).json({message: 'No data found'})
    }
    return res.status(200).json({message: 'Data found', data: cpLinkData})
}

const createCpLink = async (req , res) =>{
    const {title, url} = req.body
    if(!title || !url){
        return res.status(400).json({message: 'Please provide all fields'})
    }
    const existingLink = await cpLinkModel.findOne({title})
    if(existingLink) return res.status(400).json({message: 'Link already exists'})
    const cpLinkData = await cpLinkModel.create({title, url})
    return res.status(201).json({message: 'Data created', data: cpLinkData})
}

const deleteCpLink = async (req , res) =>{
    const id = req.params.id;
    if(!id) return res.status(400).json({message: 'Please provide id'})
    const deletedCpLink = await cpLinkModel.findByIdAndDelete(id)
    if(!deletedCpLink) return res.status(404).json({message: 'No data found'})
    return res.status(200).json({message: 'Data deleted', data: deletedCpLink})
}

const updateLink = async (req , res) =>{
    const {title , url} = req.body
    const id = req.params.id
    if(!id) return res.status(400).json({message: 'Please provide id'})
    if(!title || !url) return res.status(400).json({message:"All fields are empty"})
    const updatedLink = await cpLinkModel.findByIdAndUpdate(id , {title , url} , {new: true})
    if(!updatedLink) return res.status(404).json({message: 'No data found'})
    return res.status(200).json({message: 'Data updated', data: updatedLink})

}

const getSingleLink = async (req , res) =>{
    const id = req.params.id
    if(!id) return res.status(400).json({message: 'Please provide id'})
    const singleLink = await cpLinkModel.findById(id)
    if(!singleLink) return res.status(404).json({message: 'No data found'})
    return res.status(200).json({message: 'Data found', data: singleLink})
}
module.exports ={getAllCpLinks, createCpLink , deleteCpLink , updateLink , getSingleLink}