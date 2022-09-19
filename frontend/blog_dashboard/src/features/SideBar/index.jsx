import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Drawer } from '@mui/material'
import NavBar from './components/NavBar'

SideBar.propTypes = {}

function SideBar(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const widthSidebar = 245

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box width="100%">
            <Drawer
                variant="temporary"
                container={container}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: widthSidebar },
                }}
            >
                <NavBar />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: widthSidebar,
                    },
                }}
                open
            >
                <NavBar />
            </Drawer>
        </Box>
    )
}

export default SideBar
