import React, { useState, useEffect } from 'react';
import Menu from './Menu';

export default function CommentOptionMenu(props) {
    const options = [
        { label: 'Add Comment', action: () => { props.setCommentModalOpen(true); } }
    ];
    if (props.ownsTweet) {
        options.push({ label: 'Edit', action: () => { props.setEditTweetModalOpen(true); } });
        options.push({ label: 'Delete', action: () => { props.delete(); } });
    }
    return (
        <>
            <Menu options={options} />
        </>
    )
}
