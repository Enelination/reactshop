import * as React from "react";

import "./Tabs.css";

interface Props {
  headings?: string[];
}

interface State {
  activeName: string;
  activeContent: React.ReactNode;
}

interface TabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

interface TabsContext {
  activeName: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<TabsContext>({ activeName: "" });

class Tabs extends React.Component<Props, State> {
  public static Tab: React.FC<TabProps> = props => (
    <TabsContext.Consumer>
      {(context: TabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;
