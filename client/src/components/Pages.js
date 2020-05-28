import React from "react";
import {NavLink} from 'react-router-dom'

export const Pages = (props) => {
    let pages = [];
    for (let i=1; i <= props.totalPages; i++) {
        pages.push(i)
    }

    if (props.isLoaded){
        return (
            <div className="progress">
                <div className="indeterminate" />
            </div>
        )
    }

    return (
        <div>
            <ul className="pagination">
                {pages.map((page, index) => {
                    return <li
                        key={index}
                        onClick={(event) => props.onPagination(page)}
                        className={props.currentPage === page ? "active" : "waves-effect"}
                    >
                        <NavLink to="/">{page}</NavLink>
                    </li>
                })}
            </ul>
        </div>
    )
};