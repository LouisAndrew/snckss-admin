import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Dashboard from './dashboard'
import Editor from './editor'
import NonePage from './none'
import Orders from './orders'

export enum Views {
        NONE,
        CREATE,
        ORDERS,
}

interface Props {}

const Main: React.FC<Props> = ({}) => {
        const [view, setView] = useState(Views.NONE)

        const changeView = (view: Views): void => {
                setView(view)
        }

        return (
                <Container fluid>
                        <Row>
                                <Col md="3" lg="3" xl="3">
                                        <Dashboard changeView={changeView} />
                                </Col>
                                <Col md="9" lg="9" xl="9">
                                        {view === Views.NONE ? (
                                                <NonePage />
                                        ) : view === Views.CREATE ? (
                                                <Editor />
                                        ) : (
                                                <Orders />
                                        )}
                                </Col>
                        </Row>
                </Container>
        )
}

export default Main
