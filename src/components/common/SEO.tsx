import { Helmet } from 'react-helmet-async';
import { CONTACT_INFO } from '../../config/constants';

interface SEOProps {
    title?: string;
    description?: string;
    type?: string;
}

const siteUrl = CONTACT_INFO.websiteUrl.replace(/\/$/, '');
const defaultImage = `${siteUrl}/profile.jpg`;

export default function SEO({
    title = "Peluola David Adeoluwa | Frontend Developer & Web3 Builder",
    description = "Premium frontend developer portfolio of Peluola David Adeoluwa, building websites, landing pages, dashboards and Web3 digital experiences for brands, startups and communities.",
    type = "website"
}: SEOProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`${siteUrl}/`} />

            <meta property="og:type" content={type} />
            <meta property="og:url" content={`${siteUrl}/`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={defaultImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={`${siteUrl}/`} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={defaultImage} />
            <meta name="twitter:creator" content="@alphvibes" />
        </Helmet>
    );
}
