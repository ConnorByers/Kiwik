import React from 'react'

export default function Button(props) {
    const {
        onClick,
        children,
        file,
        setFile,
        setErrorFlag,
    } = props;

    const hiddenFileInput = React.useRef(null);
  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setErrorFlag(false);
        setFile(fileUploaded);
    };

    return (
        <>
            <a className={`button ${props.color}`} onClick={file ? handleClick : onClick}>
                {children} 
            </a>
            {file &&
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{display: 'none'}}
                />
            }
        </>
    )
}
