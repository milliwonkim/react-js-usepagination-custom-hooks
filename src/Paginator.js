import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function Paginator({totalPages, currentPage, changePageHandler}) {

    let items = null;
    const getItems = (startNumber, endNumber) => {
        const items = [];
        for(let number = startNumber; number <= endNumber; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    onClick={() => changePageHandler(number)}
                    active={number === currentPage}
                >
                    {number}
                </Pagination.Item>
            );
        }

        return items;
    };

    if(totalPages <= 6) {
        items = getItems(1, totalPages);
    } else {
        if (currentPage <= 3) {
            items = getItems(1, 4);
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(totalPages, totalPages));
        }
        else if (currentPage > 3 && currentPage < totalPages - 3) {
            items = getItems(1, 1);
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(currentPage - 1, currentPage - 1));
            items = items.concat(getItems(currentPage, currentPage));
            items = items.concat(getItems(currentPage + 1, currentPage + 1));
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(totalPages, totalPages));
        }
        else {
            items = getItems(1, 1);
            items.push(<Pagination.Ellipsis />);
            items = items.concat(getItems(totalPages - 3, totalPages));
        }
    }

    return (
        <Pagination>
            {
                currentPage > 1 && <Pagination.Prev onClick={() => changePageHandler(currentPage - 1)} />
            }
            {items}
            {
                currentPage < totalPages && <Pagination.Next onClick={() => changePageHandler(currentPage + 1)} />
            }
        </Pagination>
    )
}
