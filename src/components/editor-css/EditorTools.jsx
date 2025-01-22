import { useEffect, useRef, useState } from "react";
import { STYLES } from "../../constants/styles";
import { cleanLettersOfText } from "../../helpers/cleanLettersOfText";
import { useDragAndDropProvider } from "../../hoks/useDragAndDropProvider";
import { useEditorProvider } from "../../hoks/useEditorProvider";
import EditorToolsHeader from "./EditorToolsHeader";
import StylesOfComponent from "./StylesOfComponent";
import StateStyle from "./stylizers/StateStyle";
import StyleSelector from "./stylizers/StyleSelector";
import Display from "./stylizers/Display";
import Width from "./stylizers/Width";
import Height from "./stylizers/Height";
import Padding from "./stylizers/Padding";
import Margin from "./stylizers/Margin";
import Position from "./stylizers/Position";
import ZIndex from "./stylizers/ZIndex";
import Inset from "./stylizers/Inset";
import BorderRadius from "./stylizers/BorderRadius";
import Border from "./stylizers/Border";
import Opacity from "./stylizers/Opacity";
import Visibility from "./stylizers/Visibility";
import Cursor from "./stylizers/Cursor";
import BackgroundColor from "./stylizers/BackgroundColor";
import FontAndText from "./stylizers/FontAndText";
import TextDecoration from "./stylizers/TextDecoration";
import Transitions from "./stylizers/Transitions";
import EditorTextOfComponents from "./stylizers/EditorTextOfComponents";
import { WrapperComponents } from "../wrapper-components/WrapperComponents";


const EditorTools = () => {
  const [configTemplate, setConfigTemplate] = useState(STYLES);
  const stylesString = useRef();
  const {
    configComponent,
    handleEditComponent,
    actualConfig,
    handleActualConfig,
    breackPoint,
    deleteConfigStyle,
  } = useEditorProvider();
  const { setNewCssSelector, deleteCssSelector } = useDragAndDropProvider();

  useEffect(() => {
    let alterConf;
    if (
      breackPoint == "mobilex2" ||
      breackPoint == "tablet" ||
      breackPoint == "desktop" ||
      breackPoint == "desktopx2" ||
      breackPoint == "desktopx3"
    ) {
      alterConf = Object.assign(
        {},
        configComponent?.mediaQuerys?.[actualConfig.nameConfig] ||
        configTemplate
      );
      stylesString.current = Object.assign(
        {},
        configComponent?.mediaQuerys?.[breackPoint]?.[
        actualConfig.nameConfig
        ] || {}
      );
    } else {
      alterConf = Object.assign(
        {},
        configComponent?.normalStyles?.[actualConfig.nameConfig] ||
        configTemplate
      );
      stylesString.current = Object.assign(
        {},
        configComponent?.normalStyles?.[actualConfig.nameConfig] || {}
      );
    }
    for (const iterator in alterConf) {
      let style = alterConf[iterator];
      if (
        typeof alterConf[iterator] == "string" &&
        (style.includes("px") ||
          style.includes("%") ||
          style.includes("em") ||
          style.includes("rem") ||
          style.includes("vh") ||
          style.includes("vw"))
      ) {
        let letters = ["px", "%", "em", "rem", "vh", "vw"];
        alterConf[iterator] = cleanLettersOfText({
          text: alterConf[iterator],
          letters,
        }).split(" ");
      }
    }
    setConfigTemplate(alterConf);
  }, [configComponent, actualConfig, breackPoint]);

  const handleChange = (e) => {
    const { target } = e;

    if (target.value == "") {
      let tmp = Object.assign({}, configTemplate);
      let tmp2 = Object.assign({}, stylesString.current);
      delete tmp[target.name];
      delete tmp2[target.name];

      setConfigTemplate({ ...tmp });
      stylesString.current = { ...tmp2 };
      handleEditComponent({ ...tmp2 });
      return;
    }

    //
    if (target.name == "padding") {
      let padding;
      if (
        breackPoint == "mobilex2" ||
        breackPoint == "tablet" ||
        breackPoint == "desktop" ||
        breackPoint == "desktopx2" ||
        breackPoint == "desktopx3"
      ) {
        padding = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.padding
        );
      } else {
        padding = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.padding
        );
      }
      let type = target.dataset.sizetype;
      let stringSave = ``;
      if (target.dataset.type) {
        type = target.value;
      } else {
        padding[Number(target.dataset.position)] = target.value;
      }
      if (target.dataset.split == "joined") {
        stringSave = `${padding[0]}${type}`;
      } else {
        stringSave = `${padding[0]}${type} ${padding[1] || 0}${type} ${padding[2] || 0
          }${type} ${padding[3] || 0}${type}`;
      }
      setConfigTemplate({ ...configTemplate, [target.name]: padding });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: stringSave,
      };
    }

    //
    if (target.name == "margin" || target.name == "inset") {
      let padding;
      if (
        breackPoint == "mobilex2" ||
        breackPoint == "tablet" ||
        breackPoint == "desktop" ||
        breackPoint == "desktopx2" ||
        breackPoint == "desktopx3"
      ) {
        padding = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.margin
        );
      } else {
        padding = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.margin
        );
      }
      let type = target.dataset.sizetype;
      let toSaveString =
        stylesString.current[target.name]?.split(" ") || STYLES.margin;

      padding[Number(target.dataset.position)] = target.value;
      toSaveString[Number(target.dataset.position)] =
        target.dataset.sizetype == "auto"
          ? target.dataset.sizetype
          : `${target.value}${type}`;

      setConfigTemplate({ ...configTemplate, [target.name]: padding });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: toSaveString.join(" "),
      };
    }

    //
    if (
      target.name == "display" ||
      target.name == "justifyContent" ||
      target.name == "alignItems" ||
      target.name == "flexDirection" ||
      target.name == "backgroundColor" ||
      target.name == "textAlign" ||
      target.name == "textWrap" ||
      target.name == "fontWeight" ||
      target.name == "color" ||
      target.name == "position" ||
      target.name == "visibility" ||
      target.name == "cursor"
    ) {
      let display = target.value;
      setConfigTemplate({ ...configTemplate, [target.name]: [display] });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: `${display}`,
      };
    }

    //
    if (target.name == "gap") {
      let gap = target.value;
      setConfigTemplate({ ...configTemplate, [target.name]: [gap] });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: `${gap}px`,
      };
    }

    //
    if (target.name == "borderRadius") {
      let borderRadius;
      if (
        breackPoint == "mobilex2" ||
        breackPoint == "tablet" ||
        breackPoint == "desktop" ||
        breackPoint == "desktopx2" ||
        breackPoint == "desktopx3"
      ) {
        borderRadius = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.borderRadius
        );
      } else {
        borderRadius = Object.assign(
          [],
          configTemplate?.[target.name] || STYLES.borderRadius
        );
      }
      let type = target.dataset.sizetype;
      let stringSave = ``;
      if (target.dataset.type) {
        type = target.value;
      } else {
        borderRadius[Number(target.dataset.position)] = target.value;
      }
      if (target.dataset.split == "joined") {
        stringSave = `${borderRadius[0]}${type}`;
      } else {
        stringSave = `${borderRadius[0]}${type} ${borderRadius[1] || 0
          }${type} ${borderRadius[2] || 0}${type} ${borderRadius[3] || 0}${type}`;
      }
      setConfigTemplate({ ...configTemplate, [target.name]: borderRadius });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: stringSave,
      };
    }

    //
    if (target.name == "border") {
      let tmp = Object.assign({}, stylesString.current);
      delete tmp?.["borderTop"];
      delete tmp?.["borderRight"];
      delete tmp?.["borderBottom"];
      delete tmp?.["borderLeft"];
      const styles = JSON.parse(target.dataset.borderstyle);
      stylesString.current = {
        ...tmp,
        [target.name]: `${styles.size}${target.dataset.sizetype} ${styles.style} ${styles.color}`,
      };
    }

    //
    if (
      target.name == "borderTop" ||
      target.name == "borderRight" ||
      target.name == "borderBottom" ||
      target.name == "borderLeft"
    ) {
      let tmp = Object.assign({}, stylesString.current);
      delete tmp?.["border"];
      const styles = JSON.parse(target.dataset.borderstyle);
      stylesString.current = {
        ...tmp,
        [target.name]: `${styles.size}${target.dataset.sizetype} ${styles.style} ${styles.color}`,
      };
    }

    //
    if (
      target.name == "width" ||
      target.name == "height" ||
      target.name == "fontSize"
    ) {
      let width = target.value;
      let type = target.dataset.sizetype;
      let toSaveString = `${width}${type || ""}`;
      let toSave = width;
      if (type == "auto") {
        toSave = "auto";
        toSaveString = "auto";
      }
      if (target.dataset?.type == "select") {
        toSave = target.dataset.place;
        toSaveString = `${target.dataset.place}${target.value}`;
      }
      setConfigTemplate({ ...configTemplate, [target.name]: [toSave] });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: toSaveString,
      };
    }

    //
    if (
      target.name == "transition" ||
      target.name == "opacity" ||
      target.name == "textDecoration" ||
      target.name == "zIndex"
    ) {
      let transitions = target.value;
      setConfigTemplate({ ...configTemplate, [target.name]: [transitions] });
      stylesString.current = {
        ...stylesString.current,
        [target.name]: transitions,
      };
    }

    handleEditComponent({ ...stylesString.current });
  };

  /**
   * Funcion para estable la configuracion actual.
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.state Tipo de estado, el estado puede ser :hover,:active, etc, o puede ser el nombre del selector css.
   * @param {String} opc.typeSelect Tipo de select, para identificar si es un estado o un selector css.
   */
  const setState = ({ state, typeSelect = "state" }) => {
    let confname = actualConfig.nameConfig;
    if (actualConfig.nameConfig?.includes(":"))
      confname = actualConfig.nameConfig.split(":")[0];
    if (typeSelect == "state") {
      setNewCssSelector({
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
        newCssSelector: `${confname}${state}`,
      });
      handleActualConfig({
        nameConfig: `${confname}${state}`,
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
      });
    }
    if (typeSelect == "cssSelector") {
      setNewCssSelector({
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
        newCssSelector: `${state}`,
      });
      handleActualConfig({
        nameConfig: `${state}`,
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
      });
    }
    if (typeSelect == "deleteCssSelector") {
      deleteConfigStyle([state]);
      deleteCssSelector({
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
        cssSelector: `${state}`,
      });
      handleActualConfig({
        nameConfig: `${state}`,
        id: actualConfig.id,
        isSubComponent: actualConfig.isSubComponent,
      });
    }
  };

  return (
    <>
      <EditorToolsHeader cssClass={actualConfig.nameConfig} />
      <StateStyle setState={setState} />
      <WrapperComponents secctionName={"Css Selector"}>
        <StyleSelector
          setState={setState}
          idActualConfig={actualConfig.id}
          defaultName={`${actualConfig.nameConfig}`}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Display"}>
        <Display configTemplate={configTemplate} handleChange={handleChange} />
      </WrapperComponents>
      <WrapperComponents secctionName={"Size"}>
        <Width
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
        <Height
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Spacing"}>
        <Padding
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
        <Margin
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Position"}>
        <Position configTemplate={configTemplate} handleChange={handleChange} />
        <ZIndex
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
        <Inset
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Border"}>
        <BorderRadius
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
        <Border
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Opacity"}>
        <Opacity
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
        <Visibility
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Cursor"}>
        <Cursor
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Background"}>
        <BackgroundColor
          configTemplate={configTemplate}
          handleChange={handleChange}
          configRef={stylesString}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Font and Text"}>
        <FontAndText
          configRef={stylesString}
          configTemplate={configTemplate}
          handleChange={handleChange}
        />
        <TextDecoration
          configRef={stylesString}
          configTemplate={configTemplate}
          handleChange={handleChange}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Transitions"}>
        <Transitions
          configTemplate={configTemplate}
          handleChange={handleChange}
        />
      </WrapperComponents>
      <WrapperComponents secctionName={"Styles Of Component"}>
        <StylesOfComponent
          configTemplate={configTemplate}
          handleChange={handleChange}
          breackPoint={breackPoint}
          actualConfig={actualConfig.nameConfig}
          stylesString={stylesString}
        />
      </WrapperComponents>

      <WrapperComponents secctionName={"Text Of Component"}>
        <EditorTextOfComponents />
      </WrapperComponents>
    </>
  );
};

export default EditorTools;
