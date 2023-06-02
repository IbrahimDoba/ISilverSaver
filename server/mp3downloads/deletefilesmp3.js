const fs = require('fs');
const path = require('path');

// Function to delete videos in a folder
const deleteAudiosInFolderMp3 = (folderPathMp3) => {
  fs.readdir(folderPathMp3, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPathMp3, file);
      const fileExtension = path.extname(file).toLowerCase();

      // Check if the file extension represents a video (e.g., .mp4, .avi)
      if (['.mp3'].includes(fileExtension)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting video ${filePath}:`, err);
          } else {
            console.log(`Deleted video: ${filePath}`);
          }
        });
      }
    });
  });
};

// Usage example
// const folderPath = './mp4downloads';
const intervalMinutes = 1; // Time interval in minutes

// Schedule the deletion function to run every specified interval
setInterval(() => {
//   deleteAudiosInFolderMp3(folderPathMp3);
}, intervalMinutes * 60 * 1000);

module.exports = {
    deleteAudiosInFolderMp3,
}