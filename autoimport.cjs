// Import the fs and path modules
const fs = require('fs')
const path = require('path')

// Define a recursive function to get all files and subfiles in a folder
function getFiles(dir, files_, targetDir) {
  // Initialize the files_ array if it is not passed as an argument
  files_ = files_ || []
  // Get the files in the current directory synchronously
  let files = fs.readdirSync(dir)
  // Loop through the files
  for (let i in files) {
    // Get the full path of the file
    let name = path.join(dir, files[i])
    // Check if the file is a directory or not
    if (fs.statSync(name).isDirectory()) {
      // If the file is a directory, call the function recursively on it
      getFiles(name, files_, targetDir)
    } else {
      // If the file is not a directory, add it to the files_ array
      // Get the relative path from the target directory to the file
      let relativePath = path.relative(targetDir, name).replaceAll("\\", "/")
      // Add the relative path to the files_ array
      files_.push(relativePath)
    }
  }
  // Return the files_ array
  return files_
}

// Define a function to get the tag name from the path
const getTagNameFromPath = (path) => {
  // Check if the path is valid
  if (!path || typeof path !== "string" || !path.endsWith(".vue")) {
    return null;
  }

  // Remove the .vue extension from the path
  path = path.slice(0, -4);

  // Split the path by / character
  let segments = path.split("/");

  // Remove any empty segments from the array
  segments = segments.filter((segment) => segment);

  // Check if the array is empty
  if (segments.length === 0) {
    return null;
  }

  // Get the last segment of the array, which is the component name
  let componentName = segments[segments.length - 1];

  // Check if the component name is index, which means it is the default component of a directory
  if (componentName === "index") {
    // Remove the index segment from the array
    segments.pop();

    // Check if the array is empty
    if (segments.length === 0) {
      return null;
    }

    // Get the last segment of the array, which is the directory name
    let directoryName = segments[segments.length - 1];

    // Use the directory name as the component name
    componentName = directoryName;
  }

  // Capitalize the first letter of the component name
  componentName = componentName[0].toUpperCase() + componentName.slice(1);

  // Create an empty string for the tag name
  let tagName = "";

  // Loop through the segments array from the beginning
  for (let i = 0; i < segments.length - 1; i++) {
    // Get the current segment
    let segment = segments[i];

    // Capitalize the first letter of the segment
    segment = segment[0].toUpperCase() + segment.slice(1);

    // Append the segment to the tag name
    tagName += segment;
  }

  // Append the component name to the tag name
  tagName += componentName;

  // Return the tag name
  return tagName;
};

// Define a function to process the files
async function processFiles(dirname, filePath) {
  // Join the target directory to the __dirname
  let targetDir = path.join(__dirname, dirname)
  
  // Define a variable to store the file paths
  let filePaths = []
  
  // Use the getFiles() function to get all files and subfiles in the target directory synchronously
  filePaths = getFiles(targetDir, [], targetDir);

  // Define a variable to store the paths object
  let paths = {}

  // Loop through the file paths
  for (let filePath of filePaths) {
    // Use the getTagNameFromPath() function to get the tag name from the file path
    let tagName = getTagNameFromPath(filePath)
    // Check if the tag name is valid
    if (tagName) {
      // Add the tag name and the file path as a key-value pair to the paths object
      paths[tagName] = filePath
    }
  }

  // Define a variable to store the data to write to the file
  let data = JSON.stringify(paths, null, '\t')

  // Add the export statement to the beginning of the data
  data = `export const paths = ${data};\n`

  // Define a variable to store the full path to the file
  let fullPath = path.join(__dirname, filePath)

  // Use the fs.writeFileSync() function to write the data to the file synchronously
  fs.writeFileSync(fullPath, data)

  // Log a success message to the console
  console.log('The file was saved!')
}

// Call the function with the desired directories and file paths
processFiles('components', 'config/dynamic_components_path.js');
processFiles('pages', 'config/dynamic_pages_path.js');
processFiles('containers', 'config/dynamic_containers_path.js');

