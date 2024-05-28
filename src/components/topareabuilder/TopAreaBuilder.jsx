import { useBraeackPointProvider } from "../../hoks/useBreackPointProvider"

const TopAreaBuilder = () => {
  const { breackPoint, handleBreackPoint, handlePreviewMode } = useBraeackPointProvider()
  return (
    <div className="top__area">
      <select name="breackPoint" id="" onChange={e => handleBreackPoint(e.target.value)} value={breackPoint}>
        {/* <option value="">Select BreackPoint</option> */}
        <option value="mobile">Mobile : 320px &lt;= width &gt;= 479px</option>
        <option value="mobilex2">Mobile : 480px &lt;= width &gt;= 767px</option>
        <option value="tablet">Tablet : 768px &lt;= width &gt;= 991px</option>
        <option value="desktop">Descktop : width &gt;= 1024px</option>
        <option value="desktopx2">DescktopX2 :  width &gt;= 1280px</option>
        <option value="desktopx3">DescktopX3 :  width &gt;= 1440px</option>
      </select>
      <button type="button" onClick={e => handlePreviewMode()}>PreviewMode</button>
    </div>
  )
}

export default TopAreaBuilder