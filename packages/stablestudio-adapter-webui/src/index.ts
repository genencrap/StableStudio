import * as StableStudio from "@stability/stablestudio-adapter";

export const createAdapter = StableStudio.createAdapter(() => ({
  createStableDiffusionImages: () => {
    throw new Error("Not implemented yet!");
  },

  getStableDiffusionExistingImages: () => {
    throw new Error("Not implemented yet!");
  },

  getStableDiffusionModels: () => {
    throw new Error("Not implemented yet!");
  },

  getStableDiffusionStyles: () => {
    throw new Error("Not implemented yet!");
  },

  getStableDiffusionDefaultInput: () => {
    throw new Error("Not implemented yet!");
  },

  deleteGeneratedImages: () => {
    throw new Error("Not implemented yet!");
  },
}));
