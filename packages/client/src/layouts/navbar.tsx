import { Button, createStyles, Title } from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import Link from 'next/link'
import { useCallback } from 'react'

import { modalKeys } from '../constants/modal-keys'

const user = undefined
export const Navbar = () => {
  const { classes } = useStyles()

  const handleGetStarted = useCallback(() => {
    openContextModal({ modal: modalKeys.getStartedModal, innerProps: {} })
  }, [])
  const handleLogout = useCallback(() => {}, [])

  return (
    <header className={classes.navbarHeader}>
      <nav className={classes.nav}>
        <Title order={4}>
          <Link className={classes.navbarTitleLink} href='/'>
            URL SHORTENER
          </Link>
        </Title>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleGetStarted}>Get Started</Button>
        )}
      </nav>
    </header>
  )
}
const useStyles = createStyles(theme => ({
  navbarHeader: {
    paddingBlock: theme.spacing.md,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarTitleLink: {
    textDecoration: 'initial',
  },
}))
