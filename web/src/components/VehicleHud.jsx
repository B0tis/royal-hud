import { HugeiconsIcon } from '@hugeicons/react'
import { FuelStationIcon, BeltIcon, Car01Icon } from '@hugeicons/core-free-icons'
import useStore from '../state/store';

const VehicleHud = () => {
    const { statusValues, hudSettings } = useStore();
    
    // Vehicle settings with defaults
    const vehicleSettings = hudSettings?.vehicle || {};
    const vehicleEnabled = vehicleSettings.enabled ?? true;
    const showSpeed = vehicleSettings.showSpeed ?? true;
    const showBars = vehicleSettings.showBars ?? true;
    const speedUnit = vehicleSettings.speedUnit ?? 'MPH';

    // Don't render if vehicle HUD is disabled
    if (!vehicleEnabled) return null;

    // Values with defaults
    const speed = statusValues?.speed ?? 100;
    const rpm = statusValues?.rpm ?? 80;
    const nitro = statusValues?.nitro ?? 50;
    // Right side values
    const seatbelt = statusValues?.seatbelt ?? 100;
    const fuel = statusValues?.fuel ?? 80;
    const engine = statusValues?.engine ?? 100;

    // Get status config from settings
    const getStatusConfig = (id, defaultColor) => ({
        color: defaultColor,
        enabled: true,
        hideUnder: 0,
        ...hudSettings?.vehicleStatuses?.[id]
    });

    const statusBars = [
        { id: 'fuel', value: fuel, defaultColor: '#FFA500', icon: FuelStationIcon },
        { id: 'engine', value: engine, defaultColor: '#3b82f6', icon: Car01Icon },
        { id: 'seatbelt', value: seatbelt, defaultColor: '#a855f7', icon: BeltIcon },
    ];

    // Convert speed if needed
    const displaySpeed = speedUnit === 'KMH' ? Math.round(speed * 1.60934) : speed;

    return (
        <div className="flex gap-6 select-none items-center">
            {/* Speed and Bars Section */}
            <div className="flex flex-col items-center">
                {/* Speed Display */}
                {showSpeed && (
                    <div className="flex items-baseline gap-3 relative">
                        <span 
                            className="text-white font-black tracking-tighter"
                            style={{ fontSize: '4rem' }}
                        >
                            {displaySpeed}
                        </span>
                    </div>
                )}

                {/* RPM & Nitro Bars */}
                {showBars && (
                    <div className={`flex flex-col items-center relative w-60 gap-2 ${showSpeed ? '' : ''}`}>
                        {/* RPM Bar - White */}
                        <span className="absolute right-0 top-[-1rem] text-white/60 text-sm font-bold tracking-wider -mt-2">
                            {speedUnit}
                        </span>
                        <div className="relative w-full h-2 bg-white/20 rounded-sm overflow-hidden">
                            <div 
                                className="absolute top-0 right-0 h-full bg-white transition-all duration-150 ease-out"
                                style={{ width: `${rpm}%` }}
                            />
                        </div>

                        {/* Nitro Bar - Purple */}
                        <div className="relative w-[50%] h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 right-0 h-full rounded-full transition-all duration-150 ease-out"
                                style={{ 
                                    width: `${nitro}%`,
                                    backgroundColor: '#a855f7'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="h-12 w-0.5 rounded-full bg-white/20"></div>

            {/* Status Bars Section - Right side */}
            <div className="flex flex-col gap-4">
                {statusBars.map((status) => {
                    const config = getStatusConfig(status.id, status.defaultColor);
                    
                    // Check if status is enabled
                    if (!config.enabled) return null;
                    
                    // Check hideUnder threshold
                    if (config.hideUnder > 0 && status.value > config.hideUnder) return null;

                    return (
                        <div key={status.id} className="flex items-center gap-2">
                            <div className="w-1 h-6 relative rounded-full bg-white/20 overflow-hidden">
                                <div 
                                    className="w-full absolute bottom-0 rounded-full transition-all duration-300 ease-out"
                                    style={{
                                        height: `${status.value}%`,
                                        backgroundColor: config.color,
                                    }}
                                />
                            </div>
                            <HugeiconsIcon
                                icon={status.icon}
                                style={{ color: config.color }}
                                size={20}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default VehicleHud