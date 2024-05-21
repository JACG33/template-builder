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
      subs: [
        {
          name: "Button",
          type: "button"
        },
        {
          name: "VerticalNav",
          type: "nav",
          subs: [
            {
              name: "Button",
              type: "button"
            },
          ]
        }
      ]
    },
  ]

  return (
    <MoldeElement htmlType={"nav"} nameComponent={"VerticalNav"} other={"navbarui"} componentUi={true} subElements={subElements} />)

}