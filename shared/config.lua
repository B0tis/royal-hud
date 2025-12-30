Config = {}

Config.Debug = false -- Enable or disable debug mode
Config.Framework = 'ESX' -- options: 'ESX', 'QBX', 'STANDALONE'
Config.TickRate = 30 -- How often (in ms) the script should check for updates
Config.SaveName = 'royal-hud-settings' -- The name used to save HUD settings

-- Set this up according to your server requirements
function getFuel(vehicle)
    if GetResourceState('ox_fuel') == 'started' then
        return Entity(vehicle).state.fuel
    end

    if GetResourceState('LegacyFuel') == 'started' then
        return exports["LegacyFuel"]:GetFuel(vehicle)
    end

    return GetVehicleFuelLevel(vehicle)
end

-- Set this up according to your server requirements
function getNitroLevel(vehicle)
    return 0.0
end

-- Set this up according to your server requirements
function getStress()
    if GetResourceState('jg-stress') == 'started' then
        return exports['jg-stress']:GetStressLevel()
    end

    return 0
end
