import { Navigate, useLocation, useNavigate } from 'react-router-dom'

let temp: any = null

function Guard({
    element,
    meta,
    handleRouteBefore
}: {
    element: any
    meta: string | object
    handleRouteBefore: Function
}) {
    meta = meta || {}

    const location = useLocation()
    const { pathname } = location

    if (handleRouteBefore) {
        if (temp === element) {
            return element
        }
        const pathRes = handleRouteBefore({ pathname, meta })
        if (pathRes && pathRes !== pathname) {
            element = <Navigate to={pathRes} replace />
        }
    }

    temp = element
    return element
}

export default Guard
