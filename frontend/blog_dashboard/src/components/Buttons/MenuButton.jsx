import React, { useId } from 'react'
import PropTypes from 'prop-types'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'

MenuButton.propTypes = {
    anchorEl: PropTypes.object,
    setAnchorEl: PropTypes.func.isRequired,
    menuList: PropTypes.array.isRequired,
}

export function MenuButton({ anchorEl = null, setAnchorEl, menuList }) {
    const id = useId()
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuList?.map((menu) => {
                const Icon = menu.icon

                return (
                    <MenuItem
                        key={`${id}${menu.name}`}
                        onClick={async () => {
                            await menu.callback()
                        }}
                    >
                        <ListItemIcon>
                            <Icon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">{menu.name}</Typography>
                    </MenuItem>
                )
            })}
        </Menu>
    )
}
