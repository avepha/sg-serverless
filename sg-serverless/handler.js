import getHandler from './src/getHandler'

export const SensorLoggerSave = getHandler().sensorLoggerSave
export const SensorLogger = getHandler().sensorLogger
export const SensorLoggerCsv = getHandler().sensorLoggerCsv

export const ChannelLogger = getHandler().channelLogger
export const ChannelLoggerSave = getHandler().channelLoggerSave

export const DeviceStatusSave = getHandler().deviceStatusSave
export const DeviceStatus = getHandler().deviceStatus

export const UserRegister = getHandler().userRegister
export const User = getHandler().user

export const UserDeviceRegister = getHandler().userDeviceRegister
export const DeviceRegister = getHandler().deviceRegister

export const SendSms = getHandler().sendSms
export const SendEmail = getHandler().sendEmail
export const SGOnlineEvent = getHandler().sgOnlineEvent
export const SGOfflineEvent = getHandler().sgOfflineEvent

export const Playground = getHandler().playground
