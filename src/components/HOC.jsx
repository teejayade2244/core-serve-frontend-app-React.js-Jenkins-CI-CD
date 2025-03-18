import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props

        if (isAuthenticated) {
            return <Component {...rest} />
        } else {
            return (
                <Navigate
                    to={{
                        pathname: "/login",
                        state: { from: this.props.location },
                    }}
                />
            )
        }
    }
}

const connection = (state) => ({
    isAuthenticated: state.auth.isLoggedIn,
})

export default connect(connection)(ProtectedRoute)

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

//   if (isAuthenticated) {
//     return <Element {...rest} />;
//   } else {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: rest.location }}
//       />
//     );
//   }
// };

// export default ProtectedRoute;
