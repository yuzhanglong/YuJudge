import React from "react";

interface TagGroupProps {
  tags: string[];
}

const TagGroup: React.FunctionComponent<TagGroupProps> = (props) => {

  return (
    <>
      {props.tags}
    </>
  )
}