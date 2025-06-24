export interface Segment{
  title: string,
  value: string,
  itemTitle?: string,
  help?: {
    title?: string,
    text?: string,
    readMore?: {
      title?: string,
      text?: string
    }
  } 
  icon?: string,
  items?: Array<any>,
  component?: any
}
