import { useEffect, useState } from "react";
import AdministratorPage from "../pages/AdministratorPage";

function PrivateRoute({ isThatTrue, isTrue: goToTrue, isFalse: goToFalse }) {
    return (
        isThatTrue ? goToTrue : goToFalse
    )
}

export default PrivateRoute;