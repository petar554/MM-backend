const { Media } = require('../models');
//const { getStorage } = require('firebase-admin/storage');

// upload Media to Firebase and save metadata
// const uploadMedia = async (file, intentionId, mediaType) => {
//     const bucket = getStorage().bucket();
//     const filePath = `media/${file.originalname}`;
//     const firebaseFile = bucket.file(filePath);

//     await firebaseFile.save(file.buffer, {
//         contentType: file.mimetype,
//         metadata: {
//             firebaseStorageDownloadTokens: uuidv4(), // token for public access
//         },
//     });

//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

//     // smetadata in PostgreSQL
//     return await Media.create({
//         intention_id: intentionId,
//         media_url: publicUrl,
//         media_type: mediaType,
//     });
// };

//#todo: upgrade to use Firebase storage for storing media 
const fs = require('fs');
const path = require('path');

const uploadMedia = async (file, intentionId, mediaType) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    let publicUrl;
    
    // create folder if it does not exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, file.originalname);

    try {
        fs.writeFileSync(filePath, file.buffer);
        console.log(`File successfully saved locally at: ${filePath}`);
        
        // mock public URL
        publicUrl = `http://localhost:3000/uploads/${file.originalname}`;
    } catch (error) {
        console.error('Error saving file locally:', error.message);
        throw error;
    }

    return await Media.create({
        intention_id: intentionId,
        media_url: publicUrl,
        media_type: mediaType,
    });
};


const getMediaForIntention = async (intentionId) => {
    return await Media.findAll({ where: { intention_id: intentionId } });
};

module.exports = { uploadMedia, getMediaForIntention };
