import React from 'react'

function bookmarkHover(hover) {
    return (event) => {
        let bk = event.target;
        if (bk.className !== 'bookmark-item') {
            bk = bk.parentElement;
        }
        if (hover) {
            bk.style.backgroundColor = 'lightgrey';
        }
        else {
            bk.style.backgroundColor = '#ffffffde';
        }
    }
}


function BookmarkItem(props) {
    return (
        <div className="bookmark-item" onMouseOver={bookmarkHover(true)} onMouseOut={bookmarkHover(false)} onClick={(event) => {
            let bk = event.target;
            if (bk.className == 'bookmark-item' || bk.tagName !== 'BUTTON') {
                props.selBookmark(props.bookmark.id);
            }
        }}>
            <p>{props.bookmark.freq_left}</p>
            <p>{props.bookmark.freq_right}</p>
            <p>{props.bookmark.volume}</p>
            <button onClick={() => props.deleteBookmark(props.bookmark.id)}>
                X
            </button>
        </div>
    );
}

export default function Bookmarks(props) {
    return (
        <div className='bookmark'>
            <p>Bookmarks</p>
            {props.bookmarks.length === 0 && <p>No bookmarks yet.</p>}
            {props.bookmarks.map((bk) => (
                <BookmarkItem bookmark={bk} deleteBookmark={props.handleDelete} selBookmark={props.handleSelect}/>
            ))}
        </div>
    )
}
