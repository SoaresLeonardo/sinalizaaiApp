export type GeografInfos = {
  geoInfo: {
    latitudeX: null | string;
    latitudeY: null | string;
  };
};

export interface IContext {
  latitudes: GeografInfos;
  setLatitudes: (data: GeografInfos) => void;
}
