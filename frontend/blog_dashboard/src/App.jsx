import { Box } from '@mui/material'
import { useEffect } from 'react'
import ManagerState from './components/ManagerState'
import Main from './features/Main'
import SideBar from './features/SideBar'
import { fetchRefreshToken } from './utils/fetchData'
import { useQueryClient } from 'react-query'

function App() {
    const widthSidebar = 245
    const queryClient = useQueryClient()

    useEffect(() => {
        ;(async () => {
            const users = await fetchRefreshToken()

            // set local storage
            localStorage.setItem('users', JSON.stringify(users))
            queryClient.setQueryData('users', users)
            queryClient.invalidateQueries('users')
        })()
    }, [])

    return (
        <Box>
            <Box display="flex">
                <Box
                    sx={{
                        width: widthSidebar,
                    }}
                >
                    <SideBar />
                </Box>
                <Box flex="1 1 0" maxWidth={`calc(100% - ${widthSidebar})`}>
                    <Main />
                </Box>
            </Box>
            <ManagerState />
        </Box>
    )
}

export default App
