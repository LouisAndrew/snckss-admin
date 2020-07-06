import React from 'react'
import { ListGroup, Label, ListGroupItem } from 'reactstrap'
import { InlineIcon } from '@iconify/react'
import deleteIcon from '@iconify/icons-mdi/delete'

export interface ListItem {
        text: string
        key: any
}

interface Props {
        headerText: string
        items: ListItem[]
        handleRemove: (key: ListItem['key']) => void
}

const List: React.FC<Props> = ({ headerText, items, handleRemove }) => {
        return (
                <ListGroup>
                        <Label>{headerText}</Label>
                        {items.map((item) => (
                                <ListGroupItem key={item.key}>
                                        {item.text}
                                        <span
                                                className="delete"
                                                onClick={() =>
                                                        handleRemove(item.key)
                                                }
                                        >
                                                <InlineIcon icon={deleteIcon} />
                                        </span>
                                </ListGroupItem>
                        ))}
                </ListGroup>
        )
}

export default List
