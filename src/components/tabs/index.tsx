import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

interface Props {
        handleClick: (event: React.MouseEvent<any, MouseEvent>) => void
        className?: string
}

const Tabs: React.FC<Props> = ({ handleClick, className, children }) => {
        return (
                <NavItem className={className}>
                        <NavLink onClick={handleClick}>{children}</NavLink>
                </NavItem>
        )
}

export default Tabs
