export interface ImageProperty {
  borderStyle: 'solid' | 'dotted' | 'dashed' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  borderColor: string;
  borderWidth: string;
  boxShadow: string;
}

export interface ImagePropertyPanelProps {
  initialProperties?: Partial<ImageProperty>;
  onSave?: (properties: ImageProperty) => void;
  onCancel?: () => void;
}

export interface BorderStyle {
  value: 'solid' | 'dotted' | 'dashed' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
  label: string;
}

export interface BoxShadowOption {
  value: string;
  label: string;
  shadow: string;
}
