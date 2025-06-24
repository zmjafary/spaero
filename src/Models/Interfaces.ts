export interface HelpLink {
    link_text: string;
    icon?: string,
    help: {
        readMore?: ReadMoreInfo;
    };
}

interface ReadMoreInfo {
    title: string;
    text?: string;
    component?: string;
    data?: any;
}

export interface ModalData {
    id: string;
    content: string;
}

export interface Link {
    id: string;
    text: string;
    url: string;
}

export interface QuickBarItem {
  title: string;
  number: number | string;
  icon: string;
  label?: string;
}
 