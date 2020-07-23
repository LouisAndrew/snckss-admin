import React from 'react'
import { ListGroup, Label, ListGroupItem } from 'reactstrap'
import { InlineIcon } from '@iconify/react'
import deleteIcon from '@iconify/icons-mdi/delete'
import editIcon from '@iconify/icons-mdi/edit'

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
        handleEdit?: (key: ListItem['key']) => void
}

const List: React.FC<Props> = ({
        headerText,
        items,
        className,
        handleRemove,
        handleClick,
        handleEdit,
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
                                        <span className="icons">
                                                {handleEdit && (
                                                        <span
                                                                className={`edit-${item.text} edit list-icon`}
                                                                onClick={() =>
                                                                        handleEdit(
                                                                                item.key
                                                                        )
                                                                }
                                                        >
                                                                <InlineIcon
                                                                        icon={
                                                                                editIcon
                                                                        }
                                                                />
                                                        </span>
                                                )}
                                                <span
                                                        className={`del-${item.text} delete list-icon`}
                                                        onClick={() =>
                                                                handleRemove(
                                                                        item.key
                                                                )
                                                        }
                                                >
                                                        <InlineIcon
                                                                icon={
                                                                        deleteIcon
                                                                }
                                                        />
                                                </span>
                                        </span>
                                </ListGroupItem>
                        ))}
                </ListGroup>
        )
}

export default List
