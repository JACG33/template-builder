import { useBraeackPointProvider } from "../../hoks/useBreackPointProvider"

const TopAreaBuilder = () => {
  const { breackPoint, handleBreackPoint } = useBraeackPointProvider()
  return (
    <div className="top__area">
      <select name="breackPoint" id="" onChange={e => handleBreackPoint(e.target.value)} value={breackPoint}>
        {/* <option value="">Select BreackPoint</option> */}
        <option value="640px">sm : 640px</option>
        <option value="768px">md : 768px</option>
        <option value="1024px">lg : 1024px</option>
        <option value="1280px">xl : 1280px</option>
        <option value="1536px">2xl : 1536px</option>
      </select>
    </div>
  )
}

export default TopAreaBuilder