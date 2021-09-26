import { useState } from 'react'
import { Switch } from '@headlessui/react'

function SwitchToggle({ text }) {
    const [enabled, setEnabled] = useState(false)

    return (
        <Switch.Group>
            <div className="grid grid-cols-3 gap-4">
                <Switch.Label passive className="col-span-2" ><p>{text}</p></Switch.Label>
                <div>This is the toggle</div>
                {/* <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                    enabled ? 'bg-black' : 'bg-gray-500'
                } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span
                        className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                </Switch> */}
            </div>
        </Switch.Group>
    )
}

export default SwitchToggle
