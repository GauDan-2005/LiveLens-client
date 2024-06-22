const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "assets");
const outputFile = path.join(__dirname, "..", "constants", "Images.jsx");

const importStatements = [];
const exportStatements = {};

// Function to convert a string to camel case
const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^\w/, (c) => c.toLowerCase())
    .replace(/\.(png|jpe?g|svg|gif)$/i, "");
};

function scanDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      const relativePath = `./${path
        .relative(__dirname, fullPath)
        .replace(/\\/g, "/")}`;
      const parentFolder = path.basename(path.dirname(fullPath));
      const baseName = path.basename(file, path.extname(file));
      const variableName = toCamelCase(`${baseName}`);

      importStatements.push(`import ${variableName} from '${relativePath}';`);

      if (!exportStatements[parentFolder]) {
        exportStatements[parentFolder] = [];
      }

      exportStatements[parentFolder].push(variableName);
    }
  });
}

scanDirectory(assetsDir);

const exportObjects = Object.entries(exportStatements)
  .map(
    ([folder, variables]) =>
      `export const ${toCamelCase(folder)} = { ${variables.join(", ")} };`
  )
  .join("\n");

const outputContent = `${importStatements.join("\n")}\n\n${exportObjects}\n`;

fs.writeFileSync(outputFile, outputContent, "utf8");

console.log("Export file generated successfully!");
