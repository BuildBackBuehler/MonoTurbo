import fs from 'fs';
import path from 'path';
import docgen from 'react-docgen-typescript-loader';

const directoryPath = 'ui/components/ui';

// Get the list of files in the directory
const files = fs.readdirSync(directoryPath);

// Filter the list to only include .tsx files
const tsxFiles = files.filter(file => path.extname(file) === '.tsx');

// Parse each file and get the prop types
const componentsInfo = tsxFiles.map(file => {
    const filePath = path.join(directoryPath, file);
    const components = docgen.parse(filePath);
    return components.map(component => ({
        fileName: file,
        componentName: component.displayName,
        props: component.props
    }));
});

console.log(componentsInfo);

interface PropInfo {
    required: boolean;
    type: {
        name: string;
    };
}

interface ComponentInfo {
    fileName: string;
    componentName: string;
    props: {
        [key: string]: PropInfo;
    };
}

function ComponentsList() {
    return (
        <div>
            {componentsInfo.map((component: ComponentInfo, index: number) => (
                <div key={index}>
                    <h2>
                        {component.fileName} - {component.componentName}
                    </h2>
                    <ul>
                        {Object.entries(component.props).map(([propName, propInfo]) => (
                            <li key={propName}>
                                {propName} ({propInfo.required ? 'required' : 'optional'}): {propInfo.type?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
export { componentsInfo, ComponentsList };  