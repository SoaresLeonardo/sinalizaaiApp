export type GeografInfos = {
  geoInfo: {
    latitudeX: null | number;
    latitudeY: null | number;
  };
};

export interface IContext {
  latitudes: GeografInfos;
  setLatitudes: (data: GeografInfos) => void;
}
