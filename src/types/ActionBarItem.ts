export interface ActionBarItem {
  title: string,
  url: string,
  text?: string,
  icon?: string,
  subItems?: Array<ActionBarItem> 
}
