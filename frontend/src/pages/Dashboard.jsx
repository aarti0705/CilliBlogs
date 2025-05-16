import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/sidebar';
import MyProfile from '../dashboard/MyProfile';
import MyBlog from '../dashboard/MyBlog';
import UpdateBlog from '../dashboard/UpdateBlog';
import CreateBlog from '../dashboard/CreateBlog';
import { Navigate } from 'react-router-dom';


function Dashboard(){
  const {profile,isAuthenticated} = useAuth();
  const [component, setComponent] =useState("My Blog");
  // console.log("Dash_profile:",profile);
  // console.log("Dash_isAuthenticated:",isAuthenticated);

  if(!isAuthenticated){
    return <Navigate to={"/"}/>;
  }
  return (
    <div>
      <div>
          <Sidebar component = {component} setComponent = {setComponent}/>
          {component === "My Profile" ? (
            <MyProfile/>
          ): component === "Create Blog" ? (
            <CreateBlog/>
          ): component === "Update Blog" ? (
            <UpdateBlog/>
          ):(
            <MyBlog/>
          )}
      </div>
    </div>
  );
}

export default Dashboard;





// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthProvider';
// import Sidebar from '../dashboard/sidebar';
// import MyProflie from '../dashboard/MyProfile';
// import CreateBlog from '../dashboard/CreateBlog';
// import UpdateBlog from '../dashboard/UpdateBlog';
// import MyBlog from '../dashboard/MyBlog';
// import { Navigate } from 'react-router-dom';

// function Dashboard() {
//   const { profile, isAuthenticated } = useAuth();
//   const [ component, setComponent ] = useState("My Blog");
//   console.log("profile:", profile);
//   console.log("profile_Authenticate:", isAuthenticated);

  
//   if (!isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }
//   return (
//     <div>
//       <div>
//         <Sidebar component={component} setComponent={setComponent} />
//         {
//           component === "My Profile" ? (<MyProflie />) : component === "Create Blog" ? (<CreateBlog />) : component === "Update Blog" ? (<UpdateBlog />) : (<MyBlog />)
//         }
//       </div>
//     </div>
//   );
// };

// export default Dashboard;