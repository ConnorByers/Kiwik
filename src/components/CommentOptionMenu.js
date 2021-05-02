import React, { useState, useEffect } from 'react';
import Menu from './Menu';

export default function CommentOptionMenu(props) {
    const options = [
        { label: 'Edit', action: () => { props.setEditTweetModalOpen(true); } },
        { label: 'Delete', action: () => { props.delete(); } },
    ];
    return (
        <>
            <Menu options={options} />
        </>
    )
}
