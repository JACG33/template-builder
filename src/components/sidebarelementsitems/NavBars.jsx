import { ButtonStyles, DivStyles, VerticalNavStyles } from "../../constants/baseStyle";
import { WrapperComponents } from "../../layouts/WrapperComponents";
import MoldeElement from "./MoldeElement";

const NavBars = () => {
  return (
    <WrapperComponents secctionName={"NavBars"}>
      <MoldeElement htmlType={"nav"} nameComponent={"VerticalNav"} other={"navbar"} />
      <NavBarUi />
    </WrapperComponents>
  )
}

export default NavBars


function NavBarUi() {
  const placeholderUi = {
    ...VerticalNavStyles,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-evenly",
  }
  const subElements = [
    {
      name: "Button",
      type: "button",
      styles:{...ButtonStyles}
    },
    {
      name: "Button",
      type: "button",
      styles:{...ButtonStyles}
    },
    {
      name: "Div",
      type: "div",
      styles: {
        ...DivStyles,
        display: "flex",
        gap: "10px",
        alignItems: "center"
      },
      subs: [
        {
          name: "Button",
          type: "button",
          styles:{...ButtonStyles}
        },
        {
          name: "Button",
          type: "button",
          styles:{...ButtonStyles}
        },
      ]
    },
  ]

  return (
    <MoldeElement htmlType={"nav"} nameComponent={"VerticalNav"} other={"navbarui"} componentUi={true} subElements={subElements} styles={placeholderUi} />)

}