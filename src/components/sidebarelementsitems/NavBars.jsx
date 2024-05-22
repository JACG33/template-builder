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
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-evenly",
  }
  const subElements = [
    {
      name: "Button",
      type: "button"
    },
    {
      name: "Button",
      type: "button"
    },
    {
      name: "Div",
      type: "div",
      styles: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
      },
      subs: [
        {
          name: "Button",
          type: "button"
        },
        {
          name: "Button",
          type: "button"
        },
      ]
    },
  ]

  return (
    <MoldeElement htmlType={"nav"} nameComponent={"VerticalNav"} other={"navbarui"} componentUi={true} subElements={subElements} styles={placeholderUi} />)

}