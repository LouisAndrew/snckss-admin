import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Dashboard from './dashboard'
import NonePage from './none'
import Orders from './orders'
import Creator from './creator'

export enum Views {
        NONE,
        CREATE,
        ORDERS,
}

interface Props {}

const Main: React.FC<Props> = ({}) => {
        // Views.NONE
        const [view, setView] = useState(Views.CREATE)

        const addActiveClass = (toAdd: HTMLElement, toRemove: HTMLElement) => {
                toAdd.classList.add('active')
                toRemove.classList.remove('active')
        }

        const changeView = (view: Views): void => {
                const product: HTMLElement | null = document.querySelector(
                        '.product'
                )
                const orders: HTMLElement | null = document.querySelector(
                        '.orders'
                )

                if (product && orders) {
                        if (view === Views.CREATE) {
                                addActiveClass(product, orders)
                        } else {
                                addActiveClass(orders, product)
                        }
                }

                setView(view)
        }

        return (
                <Container fluid className="main">
                        <Row>
                                <Col md="3" lg="3" xl="3">
                                        <Dashboard changeView={changeView} />
                                </Col>
                                <Col md="9" lg="9" xl="9">
                                        {view === Views.NONE ? (
                                                <NonePage />
                                        ) : view === Views.CREATE ? (
                                                <Creator />
                                        ) : (
                                                <Orders />
                                        )}
                                </Col>
                        </Row>
                </Container>
        )
}

export default Main
