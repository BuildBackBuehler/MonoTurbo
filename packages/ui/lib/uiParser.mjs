const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Define the directory path for components
const componentsDirectory = '/Users/zack/Developer/MonoTurbo/packages/ui/components/ui';

// Function to parse a single file for component name and props
const parseComponentFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const ast = babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  let componentName = null;
  const props = [];

  traverse(ast, {
    JSXOpeningElement(path) {
      if (!componentName) {
        componentName = path.node.name.name;
      }
      path.node.attributes.forEach((attribute) => {
        if (attribute.type === 'JSXAttribute') {
          const propName = attribute.name.name;
          props.push(propName);
        }
      });
    },
  });

  return { componentName, props };
};

// Function to read the directory and parse each component file
const parseComponentsDirectory = (directoryPath) => {
  const componentList = {};

  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      const nestedComponents = parseComponentsDirectory(filePath);
      Object.assign(componentList, nestedComponents);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const { componentName, props } = parseComponentFile(filePath);
      if (componentName) {
        componentList[componentName] = props;
      }
    }
  });

  return componentList;
};

// Output the component list to a JSON file
const outputFilePath = './componentList.json';
const componentList = parseComponentsDirectory(componentsDirectory);
fs.writeFileSync(outputFilePath, JSON.stringify(componentList, null, 2));

console.log('Component list has been successfully written to componentList.json');
