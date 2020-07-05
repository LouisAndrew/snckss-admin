import React from 'react'
import { NavItem, NavLink, Nav } from 'reactstrap'

import { Views } from '..'
import './styles.scss'

interface Props {
        changeView: (view: Views) => void
}

const Dashboard: React.FC<Props> = ({ changeView }) => (
        <Nav tabs vertical className="tabs">
                <NavItem>
                        <NavLink onClick={() => changeView(Views.CREATE)}>
                                Create Products
                        </NavLink>
                </NavItem>
                <NavItem>
                        <NavLink onClick={() => changeView(Views.ORDERS)}>
                                Show Orders
                        </NavLink>
                </NavItem>
        </Nav>
)

export default Dashboard
