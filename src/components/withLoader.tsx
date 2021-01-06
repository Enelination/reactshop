import * as React from "react";

import "./spinner.css";

interface Props {
  loading: boolean;
}

const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & Props> => ({ loading, ...props }: Props) =>
  loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <Component {...(props as P)} />
  );

export default withLoader;
