import React from 'react'
import { ListGroup, Label, ListGroupItem } from 'reactstrap'
import { InlineIcon } from '@iconify/react'
import deleteIcon from '@iconify/icons-mdi/delete'

import './styles.scss'

export interface ListItem {
        text: string
        key: any
}

interface Props {
        headerText: string
        items: ListItem[]
        className?: string
        handleRemove: (key: ListItem['key']) => void
        handleClick?: (key: ListItem['key']) => void
}

const List: React.FC<Props> = ({
        headerText,
        items,
        className,
        handleRemove,
        handleClick,
}) => {
        return (
                <ListGroup className={className}>
                        <Label className="list-label">{headerText}</Label>
                        {items.map((item) => (
                                <ListGroupItem
                                        key={item.key}
                                        data-testid="list-items"
                                >
                                        <div
                                                className={`text ${
                                                        handleClick
                                                                ? 'clickable'
                                                                : ''
                                                }`}
                                                onClick={() => {
                                                        if (handleClick) {
                                                                handleClick(
                                                                        item.key
                                                                )
                                                        }
                                                }}
                                        >
                                                {item.text}
                                        </div>
                                        <span
                                                className={`del-${item.text} delete`}
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
