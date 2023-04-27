import { createStore, StoreApi } from "zustand";

/** This will very likely change before the official release! */

export const createAdapter =
  <A>(
    createAdapter: (options: {
      context: CreateAdapterContext;
      set: StoreApi<A>["setState"];
      get: StoreApi<A>["getState"];
    }) => A & Adapter
  ) =>
  (context: CreateAdapterContext) =>
    createStore<A & Adapter>((set, get) =>
      createAdapter({ set, get, context })
    );

type CreateAdapterContext = {
  gitHash: string;
};

export type Setting =
  | {
      title?: string;
      description?: string;
      placeholder?: string;
      required?: boolean;
    } & (SettingString | SettingNumber);

type SettingString = {
  type: "string";
  set: (value?: string) => void;
  get: () => string | undefined;
  value?: string;
};

type SettingNumber = {
  type: "number";
  set: (value?: number) => void;
  get: () => number | undefined;
  value?: number;
};

type MaybePromise<T> = T | Promise<T>;

export type ID = string;
export type URLString = string;

export type Adapter = {
  createStableDiffusionImages?: (options?: {
    input?: StableDiffusionInput;
    count?: number;
  }) => MaybePromise<StableDiffusionImages | undefined>;

  getStableDiffusionExistingImages?: (options?: {
    limit?: number;
    exclusiveStartImageID?: ID;
  }) => MaybePromise<StableDiffusionImages[] | undefined>;

  getStableDiffusionModels?: () => MaybePromise<
    StableDiffusionModel[] | undefined
  >;

  getStableDiffusionStyles?: () => MaybePromise<
    StableDiffusionStyle[] | undefined
  >;

  getStableDiffusionDefaultInput?: () => MaybePromise<StableDiffusionInput>;

  deleteGeneratedImages?: (options?: { imageIDs?: ID[] }) => MaybePromise<void>;
};

export type StableDiffusionInput = {
  prompts?: StableDiffusionPrompt[];

  model?: ID;
  style?: ID;

  width?: number;
  height?: number;

  cfgScale?: number;
  steps?: number;
  seed?: number;

  maskImage?: StableDiffusionInputImage;
  initialImage?: StableDiffusionInputImage;
};

export type StableDiffusionPrompt = {
  text?: string;
  weight?: number;
};

export type StableDiffusionModel = {
  id: ID;
  name?: string;
  description?: string;
  imageURL?: URLString;
};

export type StableDiffusionStyle = {
  id: ID;
  name?: string;
  description?: string;
  imageURL?: URLString;
};

export type StableDiffusionInputImage = {
  blob?: Blob;
  weight?: number;
};

export type StableDiffusionImages = {
  id: ID;
  exclusiveStartImageID?: ID;
  images?: StableDiffusionImage[];
};

export type StableDiffusionImage = {
  id: ID;
  createdAt?: Date;
  input?: StableDiffusionInput;
  blob?: Blob;
};
