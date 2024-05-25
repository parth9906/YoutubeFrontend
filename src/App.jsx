
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import LoadingUI from "./component/LoadingUI"
import CustomSnackBar from "./component/CustomSnackBar"


function App() {
  const loading = useSelector(store=>store.loader.loading)

  return (
    <div className='relative'>
      {loading && <LoadingUI/>}
      <CustomSnackBar/>
      <Outlet/>
    </div>
  )
}

export default App
