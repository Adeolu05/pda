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
    title = "David Adeoluwa | Frontend Architect",
    description = "Peluola David Adeoluwa is a Frontend Architect and Web3 Creative Strategist specializing in high-fidelity web interfaces, React development, and visual storytelling.",
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
