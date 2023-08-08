
function PrivateRoute({ isThatTrue, isTrue: goToTrue, isFalse: goToFalse }) {
    return (
        isThatTrue ? goToTrue : goToFalse
    )
}

export default PrivateRoute;