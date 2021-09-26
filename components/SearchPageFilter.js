import { useState } from "react"
import OutsideClickHandler from 'react-outside-click-handler';
import DropdownMenu from "./DropdownMenu";
import SwitchToggle from "./SwitchToggle";

function SearchPageFilter(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={isOpen? "buttonOnFocus" : "buttonOnHover"} tabIndex="0">
            <OutsideClickHandler
                onOutsideClick={() => {
                    console.log('You clicked outside of this component!!!');
                    setIsOpen(false);
            }}>
                <div
                    onClick={() => {
                        setIsOpen(!isOpen);
                        console.log("Button clicked")
                }}>
                    {props.name}
                </div>

                {isOpen && 
                <DropdownMenu className="dropDownMenu">
                    <SwitchToggle text="Only show stays that offer free cancellation"/>
                </DropdownMenu>}

            </OutsideClickHandler>
        </div>
    )
}

export default SearchPageFilter
