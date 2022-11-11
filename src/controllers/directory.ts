import express, { Response, Request } from "express"
import Directory from "../models/directory"


const createDirectory = async (req: Request, res: Response) => {
    try {
        const directory = new Directory({ name: req.body.name})
        await directory.save()
        res.status(201).json({ message: 'Directory added'})
    } catch (error) {
        throw error
    }
}


const listDirectory = async (req: Request, res: Response): Promise<void> => {
    try {
        const directories = await Directory.find()
        res.status(200).json({ directories })
    } catch (error) {
        throw error
    }
}

const deleteDirectory = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedDirectories = await Directory.findByIdAndRemove(req.params.id)
        res.status(200).json({message: "Directory deleted"})
    } catch (error) {
        throw error
    }
}

export { listDirectory, createDirectory,  deleteDirectory }