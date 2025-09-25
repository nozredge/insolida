type ET = {
    element: Element;
    value: string;
};

type StringMap<K> = Record<string, K>;
type DataT = StringMap<string | number>;
type BindingsT = StringMap<ET[]>;

export type { BindingsT, DataT };
