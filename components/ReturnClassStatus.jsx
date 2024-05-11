const ReturnClassStatus = (currentStatus, status) => {
    if ("OPEN" == status) {
        return "OPEN"
    }
    if ("NewOnly" == status) {
        return "OPEN"
    }
    if ("Waitl" == status) {
        return "Waitl"
    }
    return currentStatus
}

export default ReturnClassStatus