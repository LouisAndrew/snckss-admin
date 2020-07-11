import React, { useState } from 'react'
import { Container, Col, Row, Nav } from 'reactstrap'

import Tabs from '../../../components/tabs'
import MainEditor from './editor'

export enum Creations {
        NONE,
        CATEGORIES,
        BRAND,
        PRODUCT,
}

interface Creation {
        text: string
        creationTag: Creations
        className: string
}

interface Props {}

const Creator: React.FC<Props> = ({}) => {
        // Creations.NONE
        const [nowCreating, setNowCreating] = useState(Creations.BRAND)

        // data of things going to be created.
        const creations: Creation[] = [
                {
                        text: 'Categories',
                        creationTag: Creations.CATEGORIES,
                        className: 'categories',
                },
                {
                        text: 'Brands',
                        creationTag: Creations.BRAND,
                        className: 'brands',
                },
                {
                        text: 'Products',
                        creationTag: Creations.PRODUCT,
                        className: 'products',
                },
        ]

        // handling click by setting state based on which link is being clicked
        const handleClick = (creation: Creations) => {
                setNowCreating(creation)
        }

        return (
                <Container>
                        <Row>
                                <Col m="4" lg="4" xl="4">
                                        <h3>Select what you want to create</h3>
                                        <Nav tabs vertical>
                                                {creations.map((cr) => {
                                                        const {
                                                                text,
                                                                creationTag,
                                                                className,
                                                        } = cr
                                                        return (
                                                                <Tabs
                                                                        key={
                                                                                cr.className
                                                                        }
                                                                        handleClick={() => {
                                                                                handleClick(
                                                                                        creationTag
                                                                                )
                                                                        }}
                                                                        className={
                                                                                className
                                                                        }
                                                                >
                                                                        {text}
                                                                </Tabs>
                                                        )
                                                })}
                                        </Nav>
                                </Col>
                                <Col m="8" lg="8" xl="8">
                                        {nowCreating !== Creations.NONE && (
                                                <MainEditor
                                                        data-testid="editor"
                                                        nowCreating={
                                                                nowCreating
                                                        }
                                                />
                                        )}
                                </Col>
                        </Row>
                </Container>
        )
}

export default Creator
