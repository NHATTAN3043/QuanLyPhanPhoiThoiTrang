const cloudinary = require('cloudinary').v2
    // Configuration
    cloudinary.config({ 
        cloud_name: 'ddkek8wpn', 
        api_key: '952511852116944', 
        api_secret: 'BjQXx-r0Vq2szAX5g5tL2ODWhtY' // Click 'View Credentials' below to copy your API secret
    });
    
module.exports = cloudinary
