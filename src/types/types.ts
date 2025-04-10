
export interface Section {
  children: (Field | LineItemField)[];
  id: number;
  title: string;
  type: string;
}

export interface Field {
  acc: number;
  content: Content;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id?: string;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent: number;
  type: 'string' | 'number' | 'date' | 'drop_down';
  user_id?: string;
  drop_down_type?: string;
}

export interface LineItemField {
  acc: number;
  children: Field[][][];
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  p_title: string;
  p_type: string;
  parent_id: number;
  row_count: number;
  type: 'line_item';
}

export interface Content {
  confidence?: number;
  is_valid_format: boolean;
  orig_value: string | number;
  page?: number;
  position: number[] | [];
  position_label?: never[];
  review_required: boolean;
  validation_source: string;
  value: string | number;
}

export type ZoomLevels = 'fit' | '75%' | '100%';
export interface PositionMap {
  [key: string]: number[];
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export type Tabs = 'regular' | 'column';