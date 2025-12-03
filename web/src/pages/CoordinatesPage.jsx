import { motion } from 'framer-motion'
import useStore from '../state/store'

const CoordinatesPage = () => {
    const { hudSettings, setHudSettings } = useStore();

    // Helper to get current value with default true
    const getValue = (key) => hudSettings[key] !== false;

    // Helper to toggle - if undefined or true, set to false; if false, set to true
    const toggle = (key) => {
        const currentValue = hudSettings[key] !== false;
        setHudSettings(prev => ({ ...prev, [key]: !currentValue }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Compass Settings</h3>
            
            {/* Show Compass */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Compass</p>
                    <p className="text-white/40 text-xs mt-0.5">Display compass at top of screen</p>
                </div>
                <button
                    onClick={() => toggle('showCompass')}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        getValue('showCompass') ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: getValue('showCompass') ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Angles/Degrees */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Angles</p>
                    <p className="text-white/40 text-xs mt-0.5">Display degree numbers on compass</p>
                </div>
                <button
                    onClick={() => toggle('showAngles')}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        getValue('showAngles') ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: getValue('showAngles') ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Street Name */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Street Name</p>
                    <p className="text-white/40 text-xs mt-0.5">Display current street below compass</p>
                </div>
                <button
                    onClick={() => toggle('showStreetName')}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        getValue('showStreetName') ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: getValue('showStreetName') ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Area Name */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Area Name</p>
                    <p className="text-white/40 text-xs mt-0.5">Display area/district name below street</p>
                </div>
                <button
                    onClick={() => toggle('showAreaName')}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        getValue('showAreaName') ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: getValue('showAreaName') ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>
        </div>
    )
}

export default CoordinatesPage