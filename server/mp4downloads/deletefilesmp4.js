const fs = require('fs');
const path = require('path');

// Function to delete videos in a folder
const deleteVideosInFolder = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileExtension = path.extname(file).toLowerCase();

      // Check if the file extension represents a video (e.g., .mp4, .avi)
      if (['.mp4'].includes(fileExtension)) {
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
  // deleteVideosInFolder(folderPath);
}, intervalMinutes * 60 * 1000);

module.exports = {
  deleteVideosInFolder,
}