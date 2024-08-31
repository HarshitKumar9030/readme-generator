export type CardType = {
    id: number;
    type: string;
    content: React.ReactNode;
    options?: CardOptions;
  };
  
  export type CardOptions = {
    text?: string;
    markdown?: string;
    textStyle?: { size: string; weight: string };
    imageUrl?: string;
    color?: string;
    shadow?: string;
    linkUrl?: string;
    linkText?: string;
    icon?: string;
    profileLinks?: ProfileLink[];
    customMarkdown?: string;
    caption?: string;
    borderColor?: string;
    borderRadius?: string;
    align?: 'left' | 'center' | 'right';
  };
  
  export type ProfileLink = {
    platform: string;
    url: string;
    icon: string;
  };
  
  export type GitHubUser = {
    name: string;
    avatarUrl: string;
    bio: string;
    location: string;
    blog: string;
    followers: number;
    following: number;
    publicRepos: number;
  };
  