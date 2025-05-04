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
    const cpLinkData = await cpLinkModel.create({title, url})
    return res.status(201).json({message: 'Data created', data: cpLinkData})
}

module.exports ={getAllCpLinks, createCpLink}