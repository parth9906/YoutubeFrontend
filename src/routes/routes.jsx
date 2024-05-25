import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import PrivateRoutes from "../component/PrivateRoutes.jsx";
import RegisterPage from '../pages/RegisterPage.jsx'
import LoginPage from "../pages/LoginPage.jsx";
import Layout from "../pages/Layout.jsx";
import UserPage from "../pages/UserPage.jsx";
import VideoContainer from "../pages/VideoContainer.jsx";
import WatchPage from "../pages/WatchPage.jsx";



const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement:<>404</>,
        children:[
            {
                path:'',
                element: <Layout/>,
                children:[
                    {
                        path:'',
                        element: <VideoContainer />
                    },
                    {
                        path:'profile',
                        element: <UserPage />
                    },
                    {
                        path:'/watch/:videoId',
                        element: <WatchPage/>
                    }
        
                ]
            },
            {
                path:'register',
                element: <RegisterPage/>
            },
            {
                path:'login',
                element: <LoginPage/>
            },
        ]
    }
])

export default router;
