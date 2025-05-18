import { WindguruLimits } from './Limits';

// Enum-like object for model IDs
export const ModelId = {
  WG: WindguruLimits.DEFAULT_MODEL_ID,
  GFS: '3',
  AROME: '52',
  HARM_DK: '109',
  UKV: '101',
  ICON_2_2: '44',
  ALADIN: '107',
  ICON_2I: '104',
  ZEPHR_HD: '64',
  WRF: '21',
  HARMONIE: '57',
  ICON_7: '43',
  ICON_13: '45',
  GDPS: '59',
};

export const WindguruModels = {
  WG: {
    id: ModelId.WG,
    name: 'WG',
    description: 'Default Windguru model, best for most locations.'
  },
  GFS: {
    id: ModelId.GFS,
    name: 'GFS 13 km',
    description: 'Global Forecast System, 13 km resolution.'
  },
  AROME: {
    id: ModelId.AROME,
    name: 'AROME 1.3 km',
    description: 'AROME high-resolution model, 1.3 km.'
  },
  HARM_DK: {
    id: ModelId.HARM_DK,
    name: 'HARM–DK 2 km',
    description: 'HARMONIE–DK, 2 km resolution.'
  },
  UKV: {
    id: ModelId.UKV,
    name: 'UKV 2 km',
    description: 'UK Met Office UKV, 2 km resolution.'
  },
  ICON_2_2: {
    id: ModelId.ICON_2_2,
    name: 'ICON 2.2 km',
    description: 'ICON model, 2.2 km resolution.'
  },
  ALADIN: {
    id: ModelId.ALADIN,
    name: 'ALADIN 2.3 km',
    description: 'ALADIN model, 2.3 km resolution.'
  },
  ICON_2I: {
    id: ModelId.ICON_2I,
    name: 'ICON–2I 2.2 km',
    description: 'ICON–2I, 2.2 km resolution.'
  },
  ZEPHR_HD: {
    id: ModelId.ZEPHR_HD,
    name: 'Zephr–HD 2.6 km',
    description: 'Zephr–HD, 2.6 km resolution.'
  },
  WRF: {
    id: ModelId.WRF,
    name: 'WRF 9 km',
    description: 'WRF model, 9 km resolution.'
  },
  HARMONIE: {
    id: ModelId.HARMONIE,
    name: 'HARMONIE 5 km',
    description: 'HARMONIE, 5 km resolution.'
  },
  ICON_7: {
    id: ModelId.ICON_7,
    name: 'ICON 7 km',
    description: 'ICON model, 7 km resolution.'
  },
  ICON_13: {
    id: ModelId.ICON_13,
    name: 'ICON 13 km',
    description: 'ICON model, 13 km resolution.'
  },
  GDPS: {
    id: ModelId.GDPS,
    name: 'GDPS 15 km',
    description: 'GDPS model, 15 km resolution.'
  }
};

export const getModelName = (modelId) => {
  const model = Object.values(WindguruModels).find(m => m.id === modelId);
  return model ? model.name : 'Unknown Model';
};

export const getModelDescription = (modelId) => {
  const model = Object.values(WindguruModels).find(m => m.id === modelId);
  return model ? model.description : '';
};

export const DEFAULT_WINDGURU_PARAMS = "WINDSPD,GUST,SMER,TMPE,CDC,APCP1s,RATING";

export const WINDGURU_PARAMS_LIST = [
  { label: 'Wind speed', value: 'WINDSPD' },
  { label: 'Wind gusts', value: 'GUST' },
  { label: 'Wind direction', value: 'SMER' },
  { label: 'Temperature', value: 'TMP' },
  { label: '*Temperature', value: 'TMPE' },
  { label: 'Wind chill', value: 'WCHILL' },
  { label: '*0° isotherm (m)', value: 'FLHGT' },
  { label: 'Cloud cover (%) high / mid / low', value: 'CDC' },
  { label: 'Cloud cover (%)', value: 'TCDC' },
  { label: '*Precip. (mm/1h)', value: 'APCP1s' },
  { label: '*Pressure (hPa)', value: 'SLP' },
  { label: 'Humidity (%)', value: 'RH' },
  { label: 'Windguru rating', value: 'RATING' },
];

export const windUnitOptions = [
  { key: 'knots', label: 'knots' },
  { key: 'ms', label: 'm/s' },
  { key: 'ms01', label: 'm/s (0.1)' },
  { key: 'kmh', label: 'kmh' },
  { key: 'mph', label: 'mph' },
  { key: 'bft', label: 'Bft' },
];

export const tempUnitOptions = [
  { key: 'celsius', label: 'Celsius' },
  { key: 'fahrenheit', label: 'Fahrenheit' },
]; 