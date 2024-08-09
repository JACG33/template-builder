import React from "react";
import { useDragAndDropProvider } from "../../../hoks/useDragAndDropProvider";
import { useEditorProvider } from "../../../hoks/useEditorProvider";
import { useState } from "react";
import { useEffect } from "react";

const EditorTextOfComponents = () => {
  const { changeTextOfComponent } = useDragAndDropProvider();
  const { actualConfig } = useEditorProvider();

  const [texta, setTexta] = useState();

  const hdlTexta = (e) => {
    setTexta(e.target.value);
    changeTextOfComponent({
      id: actualConfig.id,
      isSubComponent: actualConfig.isSubComponent,
      text: e.target.value,
    });
  };

  useEffect(() => {
    if (actualConfig.text == "") setTexta("");
    else setTexta(actualConfig.text);
  }, [actualConfig.text]);

  return (
    <textarea
      name="textof"
      id="textof"
      onChange={hdlTexta}
      style={{ resize: "none", height: "200px" }}
      value={texta}
    />
  );
};

export default EditorTextOfComponents;
