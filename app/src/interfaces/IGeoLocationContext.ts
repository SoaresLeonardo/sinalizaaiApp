export type GeografInfos = {
  geoInfo: {
    latitudeX: null | string | number;
    latitudeY: null | string | number;
  };
};

export interface IContext {
  latitudes: GeografInfos;
  setLatitudes: (data: GeografInfos) => void;
}
