import React, {useContext} from 'react'

const AdminContext = React.createContext()

export function useAdmin() {
    return useContext(AdminContext)
}

export function AdminProvider({children}) {
    return (
        <AdminContext.Provider>
            {children}
        </AdminContext.Provider>
    )
}