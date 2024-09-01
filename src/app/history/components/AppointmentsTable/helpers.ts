import { GridLocaleText } from '@mui/x-data-grid'

// @ts-ignore
export const GRID_DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'Нет записей',
  noResultsOverlayLabel: 'Нет результатов',

  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компактный',
  toolbarDensityStandard: 'Стандартный',
  toolbarDensityComfortable: 'Комфортный',

  // Columns selector toolbar button text
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выбрать столбцы',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: count => (count !== 1 ? `${count} активных фильтров` : `${count} активных фильтров`),

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Быстрый поиск',
  toolbarQuickFilterLabel: 'Быстрый поиск',
  toolbarQuickFilterDeleteIconLabel: 'Очистить',

  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать как CSV',
  toolbarExportPrint: 'Печать',
  toolbarExportExcel: 'Скачать как Excel',

  // Columns panel text

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Столбцы',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'существует',
  filterOperatorNot: 'не существует',
  filterOperatorAfter: 'после',
  filterOperatorOnOrAfter: 'после или до',
  filterOperatorBefore: 'до',
  filterOperatorOnOrBefore: 'до или после',
  filterOperatorIsEmpty: 'пустой',
  filterOperatorIsNotEmpty: 'не пустой',
  filterOperatorIsAnyOf: 'любой из',

  // Filter values text
  filterValueAny: 'любой',
  filterValueTrue: 'правда',
  filterValueFalse: 'ложь',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть столбец',
  columnMenuUnsort: 'Сбросить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',

  // Column header text
  columnHeaderFiltersTooltipActive: count =>
    count !== 1 ? `${count} активных фильтров` : `${count} активных фильтров`,
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',

  // Rows selected footer text
  footerRowSelected: count =>
    count !== 1 ? `${count.toLocaleString()} строк выбрано` : `${count.toLocaleString()} строк выбрано`,

  // Total row amount footer text
  footerTotalRows: 'Всего строк:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Выбор',
  checkboxSelectionSelectAllRows: 'Выбрать все строки',
  checkboxSelectionUnselectAllRows: 'Снять выделение всех строк',
  checkboxSelectionSelectRow: 'Выбрать строку',
  checkboxSelectionUnselectRow: 'Снять выделение строки',

  // Boolean cell text
  booleanCellTrueLabel: 'да',
  booleanCellFalseLabel: 'нет',

  // Actions cell more text
  actionsCellMore: 'больше',

  // Column pinning text
  pinToLeft: 'Закрепить слева',
  pinToRight: 'Закрепить справа',
  unpin: 'Открепить',

  // Tree Data
  treeDataGroupingHeaderName: 'Группировка',
  treeDataExpand: 'Развернуть',
  treeDataCollapse: 'Свернуть',

  // Grouping columns
  groupingColumnHeaderName: 'Группировка',
  groupColumn: name => `Группировка по ${name}`,
  unGroupColumn: name => `Разгруппировать по ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size',

  columnsManagementSearchTitle: 'Поиск столбцов',
  columnsManagementNoColumns: 'Нет столбцов',
  columnsManagementShowHideAllText: 'Показать/скрыть все',
  columnsManagementReset: 'Сбросить',

  columnMenuManageColumns: 'Управлять колонками'
}
