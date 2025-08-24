import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        const connectionString = `${process.env.DB_CLOUD}${process.env.DB_CLOUD_PASSWORD}${process.env.DB_CLOUD_ENDPOINT}`  || "";
        await mongoose.connect(connectionString);
    } catch (error) {
        console.log('Failed to connect to the database', error);
        process.exit();
    }
};