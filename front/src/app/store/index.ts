export type TConversions = Array<any>;

export interface IAppState {
  conversions?: TConversions;
};

export const RootState: IAppState = {
  conversions: []
};