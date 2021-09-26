
function DropdownMenu(props) {
    return (
        <div className={`${props.className}`}>
            {props.children}
        </div>
    )
}

export default DropdownMenu
