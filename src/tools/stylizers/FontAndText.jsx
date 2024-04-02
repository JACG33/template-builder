import FontSize from "./FontSize";
import FontWeight from "./FontWeight";
import TextAlign from "./TextAlign";
import TextColor from "./TextColor";
import TextWrap from "./TextWrap";

const FontAndText = ({ handleChange, configRef, configTemplate }) => {

  return (
    <div>
      <FontSize configRef={configRef} configTemplate={configTemplate} handleChange={handleChange} sizeName={"fontSize"} />
      <TextAlign configTemplate={configTemplate} handleChange={handleChange} />
      <TextWrap configTemplate={configTemplate} handleChange={handleChange} />
      <FontWeight configTemplate={configTemplate} handleChange={handleChange} />
      <TextColor configTemplate={configTemplate} handleChange={handleChange} />
    </div>
  )
}

export default FontAndText