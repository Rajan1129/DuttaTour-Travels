import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <Layout>
      <SEO path="/404" title="Page Not Found | Dutta Tour & Travel" description="The page you're looking for could not be found." noindex />
      <section className="max-w-[840px] mx-auto px-margin py-space-xl flex flex-col items-center text-center gap-space-md">
        <span className="font-headline-xl font-bold text-primary">404</span>
        <h1 className="font-headline-lg font-bold">We couldn't find that page</h1>
        <p className="text-body-lg text-on-surface-variant max-w-md">
          The page you were looking for doesn't exist or may have moved. Try one of the links
          below, or head back to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-space-sm pt-space-sm">
          <Link to="/" className="px-5 py-3 rounded-full bg-primary-container text-on-primary font-label-lg">Go Home</Link>
          <Link to="/taxi-services" className="px-5 py-3 rounded-full bg-surface-container font-label-lg">Taxi Services</Link>
          <Link to="/tour-packages" className="px-5 py-3 rounded-full bg-surface-container font-label-lg">Tour Packages</Link>
          <Link to="/contact" className="px-5 py-3 rounded-full bg-surface-container font-label-lg">Contact</Link>
        </div>
      </section>
    </Layout>
  );
}
