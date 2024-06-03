import { ButtonStyles, DivStyles, LinkSyles, VerticalNavStyles } from "../../constants/baseStyle";
import { ramdomid } from "../../helpers/randomid";
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
  let dataId = ramdomid()

  const placeholderUi = {
    ...VerticalNavStyles,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-evenly",
  }
  const stylesModifiers = {
  }
  const subElements = [
    {
      name: "Link",
      type: "a",
      styles: { ...LinkSyles },
      moreParams: {
        href: "#"
      }
    },
    {
      name: "Div",
      type: "div",
      styles: {
        ...DivStyles,
        visibility: "hidden",
        position: "fixed",
        transition: "all 250ms ease",
        opacity: 0.01,
        inset: "-70px 0px auto 0px",
      },
      stylesModifiers: {
        "container__links--show": {
          opacity: 1,
          visibility: "visible",
          inset: "74px 0px auto 0px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "fit-content"
        }
      },
      mediaQuerys: {
        "mobilex2": {
          visibility: "visible",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          position: "initial",
          opacity: 1
        }
      },
      moreParams: {
        "data-links": dataId
      },
      subs: [
        {
          name: "Button",
          type: "button",
          styles: { ...ButtonStyles }
        },
        {
          name: "Button",
          type: "button",
          styles: { ...ButtonStyles }
        },
        {
          name: "Button",
          type: "button",
          styles: { ...ButtonStyles }
        },
        {
          name: "Button",
          type: "button",
          styles: { ...ButtonStyles }
        },
      ]
    },
    {
      name: "Button",
      type: "button",
      styles: { ...ButtonStyles },
      mediaQuerys: {
        "mobilex2": {
          display: "none"
        }
      },
      moreParams: {
        icon: "Menu2",
        id: `toggle${dataId}`
      }
    }
  ]

  const scripts = `  
  document.addEventListener("click", e => {
    const { target } = e
    if (target.closest("#toggle${dataId}")) {
      document.querySelector("[data-links='${dataId}']").classList.toggle("container__links--show")
    }
  })
  `
  return (
    <MoldeElement htmlType={"nav"} nameComponent={"VerticalNav"} other={"navbarui"} componentUi={true} subElements={subElements} styles={placeholderUi} stylesModifiers={stylesModifiers} scripts={scripts} />)

}