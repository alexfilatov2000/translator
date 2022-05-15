import React from "react";

function NotFound() {
    const style = {
        err: {
            font: 'italic small-caps bold 30px/5 cursive',
            color: "#a2a2a2"
        },
        text: {
            font: 'italic small-caps bold 20px/2 cursive',
            color: "#a2a2a2"
        },
        emoji: {
            fontSize: '30px'
        }
    }
    return (
        <div className='main'>
            <p style={style.err}>ERROR 404</p>
            <p style={style.text}>Page not found</p>
            <p style={style.text}>U shood go to home or link to another page</p>
            <p style={style.emoji}>😥😥😥</p>
        </div>
    )
}

export default NotFound;