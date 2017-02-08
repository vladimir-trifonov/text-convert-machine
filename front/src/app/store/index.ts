export type TConversions = Array<any>;
export type TCreateConversion = Object;

export interface IAppState {
  conversions?: TConversions;
  createConversion?: TCreateConversion;
};

export const RootState: IAppState = {
  conversions: [],
  createConversion: {}
};