import React from 'react'
import { NavItem, NavLink, Nav } from 'reactstrap'

import { Views } from '..'
import './styles.scss'
import Tabs from '../../../components/tabs'

interface Props {
        changeView: (view: Views) => void
}

const Dashboard: React.FC<Props> = ({ changeView }) => {
        const tabs = [
                {
                        text: 'Create Products',
                        className: 'product',
                        clickLink: Views.CREATE,
                },
                {
                        text: 'Show Orders',
                        className: 'orders',
                        clickLink: Views.ORDERS,
                },
        ]

        return (
                <Nav tabs vertical className="tabs">
                        {tabs.map((tab) => (
                                <Tabs
                                        handleClick={() => {
                                                changeView(tab.clickLink)
                                        }}
                                        className={tab.className}
                                        key={tab.className}
                                >
                                        {tab.text}{' '}
                                </Tabs>
                        ))}
                </Nav>
        )
}

export default Dashboard
