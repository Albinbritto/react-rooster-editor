export interface CellProperty {
  borderStyle: 'solid' | 'dotted' | 'dashed';
  borderColor: string;
  borderWidth: string;
  backgroundColor: string;
  horizontalAlign: 'alignCellCenter' | 'alignCellLeft' | 'alignCellRight';
  verticalAlign: 'alignCellTop' | 'alignCellMiddle' | 'alignCellBottom';
  width: string;
  height: string;
  padding: string;
  borderSelection:
    | 'allBorders'
    | 'leftBorders'
    | 'noBorders'
    | 'rightBorders'
    | 'outsideBorders'
    | 'topBorders'
    | 'bottomBorders'
    | 'insideBorders';
}

export interface CellPropertyPanelProps {
  initialProperties?: Partial<CellProperty>;
  onSave?: (properties: CellProperty) => void;
  onCancel?: () => void;
}

export interface BorderStyle {
  value: 'solid' | 'dotted' | 'dashed';
  label: string;
}

export interface BorderSelection {
  value:
    | 'allBorders'
    | 'leftBorders'
    | 'noBorders'
    | 'rightBorders'
    | 'outsideBorders'
    | 'topBorders'
    | 'bottomBorders'
    | 'insideBorders';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
