import React from "react";
import classNames from "classnames";

interface EditorTipProps {
  title: string;
  content: string;
  children?: React.ReactNode;
  className?: string;
}

const EditorTip: React.FunctionComponent<EditorTipProps> = (props) => {
  const classes = classNames('cms-problem-editor-tip', props.className);
  return (
    <div className={classes}>
      <div className={"cms-problem-editor-tip-left"}>
        <div className={"cms-problem-item-title"}>
          {props.title}
        </div>
        <div className={"cms-problem-item-description"}>
          {props.content}
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default EditorTip;