interface AuthEndpoints {
  SIGN_IN: string;
  SIGN_UP: string;
}

interface BlogEndpoints {
  BLOGS_POST: string;
  BLOGS_CATAGORIES: string;
}

export interface EndPoints {
  NEWSLATTER: string;
  INQUIRIES: string;
  CONTACT_US: string;
  AUTH: AuthEndpoints;
  BLOGS: BlogEndpoints;
}


const endPoints: EndPoints = {
  NEWSLATTER: ``,
  INQUIRIES: ``,
  CONTACT_US: ``,
  AUTH: {
    SIGN_IN: ``,
    SIGN_UP: ``,
  },
  BLOGS: {
    BLOGS_POST: ``,
    BLOGS_CATAGORIES: ``,
  },
};

export default endPoints;
