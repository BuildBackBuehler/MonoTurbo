import type { Config } from "@measured/puck";
// import { componentsInfo, ComponentsList } from "ui";  

type Props = {
  HeadingBlock: { title: string };
  // ComponentsList: { componentsInfo: string[] }; // Update the type to string[]
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    // ComponentsList: {
    //   fields: {
    //     componentsInfo: { type: "text" },
    //   },
    //   defaultProps: {
    //     componentsInfo: componentsInfo,
    //   },
    //   render: ({ componentsInfo }) => (
    //     <div style={{ padding: 64 }}>
    //       <ComponentsList componentsInfo={componentsInfo} />
    //     </div>
      // ),
    // },
  },
};

export default config;
