import React, { useState, useEffect } from 'react';
import Menu from './Menu';

export default function ProfileOptionMenu(props) {
    const options = [
        { label: 'Upload Profile Picture', action: () => { props.setUploadProfilePicOpen(true); } },
        { label: 'Logout', action: () => { props.logout(); } },
    ];
    return (
        <>
            <Menu options={options} />
        </>
    )
}
