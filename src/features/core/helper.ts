import { TableEditPlugin } from 'roosterjs-content-model-plugins';
import { TablePluginOptions } from './types/ViveEditor.type';
import { TableReorderPlugin } from '../tableedit/TableReorderPlugin';

export function createTableEditPlugin(options?: TablePluginOptions | boolean) {
  if (!options) return;

  if (typeof options === 'boolean') {
    return new TableEditPlugin();
  }

  return new TableEditPlugin(
    options.anchorContainerSelector,
    options.onTableEditorCreated,
    options.disableFeatures,
    options.tableSelector
  );
}

export function createTableReorderPlugin(options?: TablePluginOptions | boolean) {
  if (!options) return;

  if (typeof options === 'boolean') {
    return new TableReorderPlugin();
  }

  return new TableReorderPlugin(options.anchorContainerSelector, {
    enableColumnReorder:
      !options.disableFeatures || !options.disableFeatures.includes('TableColumnReorder'),
    enableRowReorder:
      !options.disableFeatures || !options.disableFeatures.includes('TableRowReorder'),
  });
}
