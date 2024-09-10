import { Helmet } from "react-helmet";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
};

const SEO = ({ title, description, keywords, author, image }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {/* الكلمة المفتاحية */}
      {author && <meta name="author" content={author} />}
      {/* مؤلف الصفحة */}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
