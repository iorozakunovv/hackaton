import { Box, Drawer } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'
import navConfig from './NavConfig'
import { NavSection } from './NavSection'
import { Scrollbar } from './Scrollbar'

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

interface SidebarProps {
  isOpenSidebar: boolean
  onCloseSidebar: () => void
}

export const Sidebar = ({ isOpenSidebar, onCloseSidebar }: SidebarProps) => {
  const { pathname } = useLocation()

  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  )
}
