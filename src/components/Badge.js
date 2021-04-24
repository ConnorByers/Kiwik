import React from 'react'

export default function Badge(props) {
    return (
        <>
            {props.icon ?
                <div className="badgeIconWrapper" onClick={props.onClick}>
                    {props.leftoffset &&
                        <div className="badgeIconInner">
                            {props.children}
                        </div>
                    }
                    {!props.leftoffset &&
                        <>{props.children}</>
                    }
                </div>
            :
                <div className={`badgeWrapper ${props.color}`} onClick={props.onClick}>
                    {props.children}
                </div>
            }
        </>
    )
}
