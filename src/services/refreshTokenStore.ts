let localStores: {[key: string]: any} = {};

export class RefreshTokenStore {
  constructor() {}

  setPayload(key: string, payload: any) {
    if (key) {
      localStores[key] = payload;
    }
  }

  getPayload(key: string) {
    if (localStores[key]) {
      return localStores[key];
    }
    return;
  }

  reset() {
    localStores = {};
  }
}
