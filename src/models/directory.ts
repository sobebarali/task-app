import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IDirectory {
    name: string;
}

// 2. Create a Schema corresponding to the document interface along with timestamps.
const directorySchema = new Schema<IDirectory>({
    name: { type: String },
}, { timestamps: true }
);

// 3. Create a Model.
const Directory: any = model<IDirectory>('Directory', directorySchema);

export default Directory